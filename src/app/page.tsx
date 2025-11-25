'use client';

import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl px-4"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Checker Maker
        </h1>
        <p className="text-xl text-default-500 mb-10">
          様々な診断テストを簡単に作成、共有
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            as={Link}
            href="/create"
            color="primary"
            size="lg"
            className="font-semibold"
            endContent={<ArrowRight size={20} />}
          >
            診断を作る
          </Button>
          <Button
            as={Link}
            href="/diagnostics"
            variant="bordered"
            size="lg"
            className="font-semibold"
          >
            診断を探す
          </Button>
        </div>
      </motion.div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-5xl">
        {[
          { title: '使いやすい', desc: '複雑なロジックもシンプルなインターフェースで作成可能。' },
          { title: 'インタラクティブ', desc: 'ユーザーを引き込む魅力的な体験。' },
          { title: '共有可能', desc: '作成した診断を誰とでも共有できます。' },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            className="p-6 rounded-xl bg-content1 border border-default-200 shadow-sm"
          >
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-default-500">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
