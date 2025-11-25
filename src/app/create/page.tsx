'use client';

import DiagnosticForm from '@/components/DiagnosticForm';
import { motion } from 'framer-motion';

export default function CreateDiagnosticPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-bold mb-2">新しい診断を作成</h1>
                <p className="text-default-500">
                    質問と結果を定義して、独自の診断テストを作成しましょう。
                </p>
            </motion.div>
            <DiagnosticForm />
        </div>
    );
}
