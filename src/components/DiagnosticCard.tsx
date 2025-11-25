'use client';

import { Diagnostic } from '@/types';
import { Card, CardHeader, CardBody, CardFooter, Button, Divider } from '@heroui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface DiagnosticCardProps {
    diagnostic: Diagnostic;
}

export default function DiagnosticCard({ diagnostic }: DiagnosticCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Card className="max-w-[400px]">
                <CardHeader className="flex gap-3">
                    <div className="flex flex-col">
                        <p className="text-md">{diagnostic.title}</p>
                        <p className="text-small text-default-500">
                            {diagnostic.questions.length} Questions
                        </p>
                    </div>
                </CardHeader>
                <Divider />
                <CardBody>
                    <p>{diagnostic.description}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Button
                        as={Link}
                        href={`/diagnostics/${diagnostic.id}`}
                        color="primary"
                        variant="solid"
                        className="w-full"
                    >
                        Start Diagnostic
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
