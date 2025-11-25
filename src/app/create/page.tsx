'use client';

import DiagnosticForm from '@/components/DiagnosticForm';
import { motion } from 'framer-motion';

export default function CreateDiagnosticPage() {
    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-4xl font-bold">Create New Diagnostic</h1>
                <p className="text-default-500 mt-2">
                    Design your own diagnostic tool in 3 simple steps.
                </p>
            </motion.div>

            <DiagnosticForm />
        </div>
    );
}
