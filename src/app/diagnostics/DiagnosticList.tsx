'use client';

import { Diagnostic } from '@/types';
import DiagnosticCard from '@/components/DiagnosticCard';
import { motion } from 'framer-motion';

export default function DiagnosticList({ diagnostics }: { diagnostics: Diagnostic[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnostics.map((diagnostic, index) => (
                <motion.div
                    key={diagnostic.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <DiagnosticCard diagnostic={diagnostic} />
                </motion.div>
            ))}
            {diagnostics.length === 0 && (
                <div className="col-span-full text-center text-default-500 py-10">
                    診断がまだありません。
                </div>
            )}
        </div>
    );
}
