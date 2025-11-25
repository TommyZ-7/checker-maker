"use server";

import { redis } from "@/lib/redis";
import { Diagnostic } from "@/types";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { validateDiagnostic, sanitizeDiagnostic } from "@/lib/validation";

export async function saveDiagnostic(diagnostic: Diagnostic) {
  try {
    // Validate
    const validation = validateDiagnostic(diagnostic);
    if (!validation.valid) {
      return { success: false, error: validation.errors.join("\n") };
    }

    // Sanitize
    const sanitizedDiagnostic = sanitizeDiagnostic(diagnostic);

    // Save the diagnostic object
    await redis.set(
      `diagnostic:${sanitizedDiagnostic.id}`,
      JSON.stringify(sanitizedDiagnostic)
    );

    // Add the ID to a list of all diagnostics
    // Using a set to avoid duplicates, though IDs should be unique
    await redis.sadd("diagnostics", sanitizedDiagnostic.id);

    revalidatePath("/diagnostics");
    revalidateTag("diagnostics");
    revalidateTag(`diagnostic-${sanitizedDiagnostic.id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to save diagnostic:", error);
    return { success: false, error: "Failed to save diagnostic" };
  }
}

// キャッシュ付きのデータ取得関数（内部実装）
const getCachedDiagnostics = unstable_cache(
  async (): Promise<Diagnostic[]> => {
    // Get all diagnostic IDs
    const ids = await redis.smembers("diagnostics");

    if (ids.length === 0) {
      return [];
    }

    // Fetch all diagnostics in parallel
    // redis.mget can fetch multiple keys at once
    const keys = ids.map((id) => `diagnostic:${id}`);
    const diagnostics = await redis.mget<Diagnostic[]>(...keys);

    // Filter out any nulls (in case a key was deleted but id remained in set)
    return diagnostics.filter((d): d is Diagnostic => d !== null);
  },
  ["diagnostics"],
  {
    tags: ["diagnostics"],
    revalidate: false, // 永続キャッシュ（On-demand Revalidationのみで更新）
  }
);

export async function getDiagnostics(): Promise<Diagnostic[]> {
  try {
    return await getCachedDiagnostics();
  } catch (error) {
    console.error("Failed to get diagnostics:", error);
    return [];
  }
}

// 個別診断のキャッシュ取得関数を生成
const getCachedDiagnostic = (id: string) =>
  unstable_cache(
    async (): Promise<Diagnostic | null> => {
      const diagnostic = await redis.get<Diagnostic>(`diagnostic:${id}`);
      return diagnostic;
    },
    [`diagnostic-${id}`],
    {
      tags: [`diagnostic-${id}`, "diagnostics"],
      revalidate: false, // 永続キャッシュ（On-demand Revalidationのみで更新）
    }
  );

export async function getDiagnostic(id: string): Promise<Diagnostic | null> {
  try {
    return await getCachedDiagnostic(id)();
  } catch (error) {
    console.error(`Failed to get diagnostic ${id}:`, error);
    return null;
  }
}
