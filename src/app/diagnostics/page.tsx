import { getDiagnostics } from "@/app/actions";
import DiagnosticList from "./DiagnosticList";

export default async function DiagnosticsPage() {
  const diagnostics = await getDiagnostics();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">診断を探す</h1>
      <DiagnosticList diagnostics={diagnostics} />
    </div>
  );
}
