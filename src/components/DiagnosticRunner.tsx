'use client';

import { useState } from 'react';
import { Diagnostic, ResultDefinition } from '@/types';
import { Button, Card, CardBody, CardHeader, Progress } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagnosticRunnerProps {
    diagnostic: Diagnostic;
}

export default function DiagnosticRunner({ diagnostic }: DiagnosticRunnerProps) {
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [result, setResult] = useState<ResultDefinition | null>(null);

    const handleStart = () => {
        setStarted(true);
    };

    const handleAnswer = (points: number) => {
        const newScore = totalScore + points;
        setTotalScore(newScore);

        if (currentQuestionIndex < diagnostic.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishDiagnostic(newScore);
        }
    };

    const finishDiagnostic = (finalScore: number) => {
        const foundResult = diagnostic.results.find(
            (r) => finalScore >= r.minPoints && finalScore <= r.maxPoints
        );
        setResult(foundResult || diagnostic.results[0]); // Fallback to first result if none match (shouldn't happen with good data)
        setFinished(true);
    };

    const reset = () => {
        setStarted(false);
        setCurrentQuestionIndex(0);
        setTotalScore(0);
        setFinished(false);
        setResult(null);
    };

    if (!started) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-md"
                >
                    <h1 className="text-4xl font-bold mb-4">{diagnostic.title}</h1>
                    <p className="text-xl text-default-600 mb-8">{diagnostic.description}</p>
                    <Button size="lg" color="primary" onPress={handleStart} className="font-semibold">
                        Start Diagnostic
                    </Button>
                </motion.div>
            </div>
        );
    }

    if (finished && result) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-lg"
                >
                    <Card className="p-6">
                        <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
                            <p className="text-tiny uppercase font-bold text-primary">Result</p>
                            <h2 className="font-bold text-3xl">{result.title}</h2>
                        </CardHeader>
                        <CardBody className="overflow-visible py-4">
                            <p className="text-lg text-default-600">{result.description}</p>
                        </CardBody>
                    </Card>
                    <div className="mt-8">
                        <Button color="secondary" variant="flat" onPress={reset}>
                            Retake Diagnostic
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = diagnostic.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / diagnostic.questions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto p-4 min-h-[60vh] flex flex-col justify-center">
            <div className="mb-8">
                <Progress aria-label="Progress" value={progress} className="max-w-md mx-auto" color="primary" size="sm" />
                <p className="text-center text-small text-default-400 mt-2">
                    Question {currentQuestionIndex + 1} of {diagnostic.questions.length}
                </p>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">{currentQuestion.text}</h2>
                    <div className="grid gap-4">
                        {currentQuestion.choices.map((choice, index) => (
                            <motion.div
                                key={choice.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Button
                                    className="w-full h-auto py-4 text-left justify-start whitespace-normal"
                                    variant="bordered"
                                    size="lg"
                                    onPress={() => handleAnswer(choice.points)}
                                >
                                    {choice.text}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
