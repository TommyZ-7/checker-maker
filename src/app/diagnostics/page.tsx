'use client';

import { DUMMY_DIAGNOSTICS } from '@/data/dummy';
import DiagnosticCard from '@/components/DiagnosticCard';
import { motion } from 'framer-motion';

export default function DiagnosticsPage() {
    return (
        <div className="max-w-6xl mx-auto">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-8"
            >
                診断を探す
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DUMMY_DIAGNOSTICS.map((diagnostic, index) => (
                    <motion.div
                        key={diagnostic.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <DiagnosticCard diagnostic={diagnostic} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
