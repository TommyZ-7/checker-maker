'use client';

import { useState } from 'react';
import { Diagnostic, ResultDefinition } from '@/types';
import { Button, Card, CardBody, CardHeader, Progress } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RefreshCcw } from 'lucide-react';
import Link from 'next/link';

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

    const handleRetake = () => {
        reset();
        setStarted(true);
    };

    const getResult = () => result;
    const score = totalScore;
    const showResult = finished;
    const currentIndex = currentQuestionIndex;

    if (!started) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        {diagnostic.title}
                    </h1>
                    <p className="text-xl text-default-500 mb-8 max-w-2xl">
                        {diagnostic.description}
                    </p>
                    <Button
                        color="primary"
                        size="lg"
                        className="font-semibold"
                        endContent={<ArrowRight />}
                        onPress={handleStart}
                    >
                        診断を開始
                    </Button>
                </motion.div>
            </div>
        );
    }

    if (showResult) {
        const result = getResult();
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl w-full"
                >
                    <Card className="p-8 border-2 border-primary/20">
                        <CardBody className="items-center">
                            <h2 className="text-3xl font-bold mb-2">あなたの結果:</h2>
                            <h3 className="text-4xl font-extrabold text-primary mb-4">
                                {result?.title || "結果が見つかりません"}
                            </h3>
                            <p className="text-lg text-default-500 mb-6">
                                {result?.description}
                            </p>
                            <div className="text-small text-default-400 mb-8">
                                スコア: {score} 点
                            </div>
                            <div className="flex gap-4 justify-center">
                                <Button
                                    color="primary"
                                    variant="flat"
                                    onPress={handleRetake}
                                    startContent={<RefreshCcw size={18} />}
                                >
                                    もう一度診断する
                                </Button>
                                <Button
                                    as={Link}
                                    href="/diagnostics"
                                    variant="bordered"
                                >
                                    一覧に戻る
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = diagnostic.questions[currentIndex];

    return (
        <div className="max-w-3xl mx-auto p-4 min-h-[500px] flex flex-col justify-center">
            <div className="mb-8">
                <div className="flex justify-between text-small text-default-500 mb-2">
                    <span>質問 {currentIndex + 1} / {diagnostic.questions.length}</span>
                    <span>{Math.round(((currentIndex) / diagnostic.questions.length) * 100)}% 完了</span>
                </div>
                <Progress
                    value={((currentIndex) / diagnostic.questions.length) * 100}
                    color="primary"
                    className="h-2"
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="p-6 mb-6">
                        <CardBody>
                            <h2 className="text-2xl font-bold mb-6">
                                {currentQuestion.text}
                            </h2>
                            <div className="grid gap-4">
                                {currentQuestion.choices.map((choice) => (
                                    <Button
                                        key={choice.id}
                                        size="lg"
                                        variant="flat"
                                        className="justify-start h-auto py-4 px-6 text-left whitespace-normal"
                                        onPress={() => handleAnswer(choice.points)}
                                    >
                                        {choice.text}
                                    </Button>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
