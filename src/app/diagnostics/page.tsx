'use client';

import { DUMMY_DIAGNOSTICS } from '@/data/dummy';
import DiagnosticCard from '@/components/DiagnosticCard';
import { motion } from 'framer-motion';

export default function DiagnosticsPage() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl font-bold">Explore Diagnostics</h1>
                <p className="text-default-500 mt-2">
                    Find the perfect assessment for you.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DUMMY_DIAGNOSTICS.map((diagnostic, index) => (
                    <motion.div
                        key={diagnostic.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                        <DiagnosticCard diagnostic={diagnostic} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
