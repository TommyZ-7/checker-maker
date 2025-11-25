'use client';

import { useState } from 'react';
import { Diagnostic, Question, Choice, ResultDefinition } from '@/types';
import { Input, Textarea, Button, Card, CardBody, CardHeader, Divider, Select, SelectItem, ScrollShadow } from '@heroui/react';
import { motion, Reorder, useDragControls } from 'framer-motion';
import { Plus, Trash, ArrowRight, ArrowLeft, GripVertical } from 'lucide-react';

// Drag handle component
const DragHandle = ({ dragControls }: { dragControls: any }) => {
    return (
        <div
            onPointerDown={(e) => dragControls.start(e)}
            className="cursor-grab active:cursor-grabbing p-2 text-default-400 hover:text-default-600"
        >
            <GripVertical size={20} />
        </div>
    );
};

// Reorderable Item Component
const QuestionListItem = ({
    question,
    index,
    isSelected,
    onSelect,
    onDelete
}: {
    question: Question;
    index: number;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: () => void;
}) => {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={question}
            id={question.id}
            dragListener={false}
            dragControls={dragControls}
            className="mb-2"
        >
            <Card
                className={`w-full transition-colors cursor-pointer ${isSelected ? 'border-primary border-2' : 'border-transparent border-2'}`}
            >
                <div onClick={onSelect} className="w-full">
                    <CardBody className="p-3 flex flex-row items-center gap-2">
                        <DragHandle dragControls={dragControls} />
                        <div className="flex-grow min-w-0">
                            <p className="font-semibold truncate">
                                {question.text || `Question ${index + 1}`}
                            </p>
                            <p className="text-tiny text-default-400">
                                {question.choices.length} choices
                            </p>
                        </div>
                        <Button
                            isIconOnly
                            size="sm"
                            color="danger"
                            variant="light"
                            onPress={(e) => {
                                // @ts-ignore
                                onDelete();
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Trash size={16} />
                        </Button>
                    </CardBody>
                </div>
            </Card>
        </Reorder.Item>
    );
};

export default function DiagnosticForm() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<Partial<Diagnostic>>({
        title: '',
        description: '',
        questions: [],
        results: [],
    });
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
    const [selectedResultId, setSelectedResultId] = useState<string | null>(null);

    const handleNext = () => setStep((prev) => prev + 1);
    const handleBack = () => setStep((prev) => prev - 1);

    const updateField = (field: keyof Diagnostic, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // --- Step 0: Details ---
    const renderDetailsStep = () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Diagnostic Details</h2>
            <Input
                label="Title"
                placeholder="Enter diagnostic title"
                value={formData.title}
                onValueChange={(val) => updateField('title', val)}
                isRequired
            />
            <Textarea
                label="Description"
                placeholder="Enter diagnostic description"
                value={formData.description}
                onValueChange={(val) => updateField('description', val)}
                isRequired
            />
        </div>
    );

    // --- Step 1: Questions ---
    const addQuestion = () => {
        const newQuestion: Question = {
            id: `q_${Date.now()}`,
            text: '',
            choices: [
                { id: `c_${Date.now()}_1`, text: '', points: 0 },
                { id: `c_${Date.now()}_2`, text: '', points: 0 },
            ],
        };
        const newQuestions = [...(formData.questions || []), newQuestion];
        updateField('questions', newQuestions);
        setSelectedQuestionId(newQuestion.id);
    };

    const updateQuestion = (index: number, field: keyof Question, value: any) => {
        const newQuestions = [...(formData.questions || [])];
        newQuestions[index] = { ...newQuestions[index], [field]: value };
        updateField('questions', newQuestions);
    };

    const removeQuestion = (id: string) => {
        const newQuestions = (formData.questions || []).filter(q => q.id !== id);
        updateField('questions', newQuestions);
        if (selectedQuestionId === id) {
            setSelectedQuestionId(null);
        }
    };

    const handleReorder = (newOrder: Question[]) => {
        updateField('questions', newOrder);
    };

    const addChoice = (qIndex: number) => {
        const newQuestions = [...(formData.questions || [])];
        newQuestions[qIndex].choices.push({
            id: `c_${Date.now()}`,
            text: '',
            points: 0,
        });
        updateField('questions', newQuestions);
    };

    const updateChoice = (qIndex: number, cIndex: number, field: keyof Choice, value: any) => {
        const newQuestions = [...(formData.questions || [])];
        newQuestions[qIndex].choices[cIndex] = {
            ...newQuestions[qIndex].choices[cIndex],
            [field]: value,
        };
        updateField('questions', newQuestions);
    };

    const removeChoice = (qIndex: number, cIndex: number) => {
        const newQuestions = [...(formData.questions || [])];
        newQuestions[qIndex].choices.splice(cIndex, 1);
        updateField('questions', newQuestions);
    };

    const renderQuestionsStep = () => {
        const questions = formData.questions || [];
        const selectedIndex = questions.findIndex(q => q.id === selectedQuestionId);
        const selectedQuestion = questions[selectedIndex];

        return (
            <div className="flex h-[600px] gap-6">
                {/* Left Column: List */}
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">Questions</h3>
                        <Button isIconOnly color="primary" size="sm" onPress={addQuestion}>
                            <Plus size={20} />
                        </Button>
                    </div>
                    <ScrollShadow className="flex-grow p-2 rounded-lg bg-content2/50">
                        <Reorder.Group axis="y" values={questions} onReorder={handleReorder}>
                            {questions.map((q, index) => (
                                <QuestionListItem
                                    key={q.id}
                                    question={q}
                                    index={index}
                                    isSelected={q.id === selectedQuestionId}
                                    onSelect={() => setSelectedQuestionId(q.id)}
                                    onDelete={() => removeQuestion(q.id)}
                                />
                            ))}
                        </Reorder.Group>
                        {questions.length === 0 && (
                            <div className="text-center text-default-400 mt-10">
                                No questions yet. Click + to add one.
                            </div>
                        )}
                    </ScrollShadow>
                </div>

                {/* Right Column: Editor */}
                <div className="w-2/3 flex flex-col">
                    {selectedQuestion ? (
                        <Card className="h-full">
                            <CardHeader>
                                <h3 className="text-xl font-bold">Edit Question {selectedIndex + 1}</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody className="gap-6 overflow-y-auto">
                                <Input
                                    label="Question Text"
                                    placeholder="Enter your question here"
                                    value={selectedQuestion.text}
                                    onValueChange={(val) => updateQuestion(selectedIndex, 'text', val)}
                                />

                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-md font-semibold">Choices</h4>
                                        <Button size="sm" variant="flat" onPress={() => addChoice(selectedIndex)}>
                                            Add Choice
                                        </Button>
                                    </div>
                                    <div className="space-y-3">
                                        {selectedQuestion.choices.map((c, cIndex) => (
                                            <div key={c.id} className="flex gap-2 items-start">
                                                <Input
                                                    placeholder="Choice text"
                                                    value={c.text}
                                                    onValueChange={(val) => updateChoice(selectedIndex, cIndex, 'text', val)}
                                                    className="flex-grow"
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Pts"
                                                    value={c.points.toString()}
                                                    onValueChange={(val) => updateChoice(selectedIndex, cIndex, 'points', parseInt(val) || 0)}
                                                    className="w-20"
                                                />
                                                <Button isIconOnly color="danger" variant="light" onPress={() => removeChoice(selectedIndex, cIndex)}>
                                                    <Trash size={16} />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ) : (
                        <div className="h-full flex items-center justify-center text-default-400 bg-content2/30 rounded-lg border-2 border-dashed border-default-200">
                            Select a question to edit
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // --- Step 2: Results ---
    const calculateScoreRange = () => {
        return (formData.questions || []).reduce(
            (acc, q) => {
                const points = q.choices.map(c => c.points || 0);
                const maxChoice = points.length > 0 ? Math.max(...points) : 0;
                const minChoice = points.length > 0 ? Math.min(...points) : 0;

                return {
                    min: acc.min + minChoice,
                    max: acc.max + maxChoice
                };
            },
            { min: 0, max: 0 }
        );
    };

    const { min: minScore, max: maxScore } = calculateScoreRange();

    const addResult = () => {
        // Auto-calculate next range
        const sortedResults = [...(formData.results || [])].sort((a, b) => a.minPoints - b.minPoints);
        const lastResult = sortedResults[sortedResults.length - 1];

        let nextMin = lastResult ? lastResult.maxPoints + 1 : minScore;
        if (nextMin > maxScore) nextMin = maxScore;

        const newResult: ResultDefinition = {
            id: `r_${Date.now()}`,
            title: '',
            description: '',
            minPoints: nextMin,
            maxPoints: maxScore,
        };
        updateField('results', [...(formData.results || []), newResult]);
        setSelectedResultId(newResult.id);
    };

    const updateResult = (index: number, field: keyof ResultDefinition, value: any) => {
        const newResults = [...(formData.results || [])];
        const currentResult = newResults[index];

        if (field === 'minPoints' || field === 'maxPoints') {
            let numVal = parseInt(value);
            if (isNaN(numVal)) numVal = 0;

            // Clamp value to min/max score range
            if (numVal < minScore) numVal = minScore;
            if (numVal > maxScore) numVal = maxScore;

            // Proposed new values
            const proposedMin = field === 'minPoints' ? numVal : currentResult.minPoints;
            const proposedMax = field === 'maxPoints' ? numVal : currentResult.maxPoints;

            // 1. Check consistency: minPoints must be <= maxPoints
            if (proposedMin > proposedMax) {
                return; // Reject update
            }

            // 2. Check for overlaps with other results
            const hasOverlap = newResults.some((r, i) => {
                if (i === index) return false; // Skip self
                return (proposedMin <= r.maxPoints && proposedMax >= r.minPoints);
            });

            if (hasOverlap) {
                return; // Reject update
            }

            newResults[index] = { ...newResults[index], [field]: numVal };
        } else {
            newResults[index] = { ...newResults[index], [field]: value };
        }

        updateField('results', newResults);
    };

    const removeResult = (id: string) => {
        const newResults = (formData.results || []).filter(r => r.id !== id);
        updateField('results', newResults);
        if (selectedResultId === id) {
            setSelectedResultId(null);
        }
    };

    const renderCoverageBar = () => {
        const results = [...(formData.results || [])].sort((a, b) => a.minPoints - b.minPoints);
        const rangeSpan = maxScore - minScore;
        const totalRange = rangeSpan > 0 ? rangeSpan : 1;

        // Find gaps
        const gaps = [];
        let currentPoint = minScore;

        results.forEach(r => {
            if (r.minPoints > currentPoint) {
                gaps.push({ start: currentPoint, end: r.minPoints - 1 });
            }
            currentPoint = Math.max(currentPoint, r.maxPoints + 1);
        });

        if (currentPoint <= maxScore) {
            gaps.push({ start: currentPoint, end: maxScore });
        }

        return (
            <div className="mb-6">
                <div className="flex justify-between text-small text-default-500 mb-2">
                    <span>{minScore} Points</span>
                    <span>Max: {maxScore} Points</span>
                </div>
                <div className="h-8 w-full bg-default-100 rounded-full overflow-hidden relative border border-default-200">
                    {results.map((r, i) => {
                        const totalPoints = rangeSpan + 1;
                        const startOffset = r.minPoints - minScore;
                        const span = r.maxPoints - r.minPoints + 1;

                        const left = (startOffset / totalPoints) * 100;
                        const width = (span / totalPoints) * 100;

                        return (
                            <div
                                key={r.id}
                                className="absolute h-full bg-primary/80 border-r border-background flex items-center justify-center text-[10px] text-white truncate px-1 transition-all hover:bg-primary"
                                style={{
                                    left: `${left}%`,
                                    width: `${width}%`
                                }}
                                title={`${r.title}: ${r.minPoints} to ${r.maxPoints}`}
                            >
                                {span > 2 ? `${r.minPoints}-${r.maxPoints}` : ''}
                            </div>
                        );
                    })}
                </div>
                {gaps.length > 0 && (
                    <div className="text-danger text-small mt-2 flex items-center gap-2">
                        <Trash size={14} className="rotate-45" />
                        Missing coverage for: {gaps.map(g => `${g.start} to ${g.end}`).join(', ')}
                    </div>
                )}
            </div>
        );
    };

    const renderResultsStep = () => {
        const results = formData.results || [];
        const selectedIndex = results.findIndex(r => r.id === selectedResultId);
        const selectedResult = results[selectedIndex];

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Results Logic</h2>
                        <p className="text-default-500 text-small">
                            Define results based on the total score ({minScore} to {maxScore}).
                        </p>
                    </div>
                </div>

                {renderCoverageBar()}

                <div className="flex h-[500px] gap-6">
                    {/* Left Column: List */}
                    <div className="w-1/3 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Results</h3>
                            <Button isIconOnly color="primary" size="sm" onPress={addResult}>
                                <Plus size={20} />
                            </Button>
                        </div>
                        <ScrollShadow className="flex-grow p-2 rounded-lg bg-content2/50">
                            {results.map((r, index) => (
                                <Card
                                    key={r.id}
                                    className={`mb-2 w-full transition-colors cursor-pointer ${r.id === selectedResultId ? 'border-primary border-2' : 'border-transparent border-2'}`}
                                >
                                    <div onClick={() => setSelectedResultId(r.id)} className="w-full">
                                        <CardBody className="p-3 flex flex-row items-center gap-2">
                                            <div className="flex-grow min-w-0">
                                                <p className="font-semibold truncate">
                                                    {r.title || `Result ${index + 1}`}
                                                </p>
                                                <p className="text-tiny text-default-400">
                                                    {r.minPoints} to {r.maxPoints} pts
                                                </p>
                                            </div>
                                            <Button
                                                isIconOnly
                                                size="sm"
                                                color="danger"
                                                variant="light"
                                                onPress={() => removeResult(r.id)}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        </CardBody>
                                    </div>
                                </Card>
                            ))}
                            {results.length === 0 && (
                                <div className="text-center text-default-400 mt-10">
                                    No results yet. Click + to add one.
                                </div>
                            )}
                        </ScrollShadow>
                    </div>

                    {/* Right Column: Editor */}
                    <div className="w-2/3 flex flex-col">
                        {selectedResult ? (
                            <Card className="h-full">
                                <CardHeader>
                                    <h3 className="text-xl font-bold">Edit Result {selectedIndex + 1}</h3>
                                </CardHeader>
                                <Divider />
                                <CardBody className="gap-6 overflow-y-auto">
                                    <Input
                                        label="Result Title"
                                        placeholder="e.g., You are a Warrior!"
                                        value={selectedResult.title}
                                        onValueChange={(val) => updateResult(selectedIndex, 'title', val)}
                                    />

                                    <div className="flex gap-4 items-center">
                                        <Input
                                            type="number"
                                            label="Min Points"
                                            value={selectedResult.minPoints.toString()}
                                            onValueChange={(val) => updateResult(selectedIndex, 'minPoints', val)}
                                            min={minScore}
                                            max={maxScore}
                                        />
                                        <span className="text-default-400">-</span>
                                        <Input
                                            type="number"
                                            label="Max Points"
                                            value={selectedResult.maxPoints.toString()}
                                            onValueChange={(val) => updateResult(selectedIndex, 'maxPoints', val)}
                                            min={minScore}
                                            max={maxScore}
                                        />
                                    </div>

                                    <Textarea
                                        label="Description"
                                        placeholder="Result description"
                                        value={selectedResult.description}
                                        onValueChange={(val) => updateResult(selectedIndex, 'description', val)}
                                        minRows={5}
                                    />
                                </CardBody>
                            </Card>
                        ) : (
                            <div className="h-full flex items-center justify-center text-default-400 bg-content2/30 rounded-lg border-2 border-dashed border-default-200">
                                Select a result to edit
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const handleSubmit = () => {
        console.log('Submitting Diagnostic:', formData);
        alert('Diagnostic created! (Check console for data)');
        // In a real app, this would POST to an API
    };

    return (
        <div className="max-w-5xl mx-auto p-4">
            <div className="mb-8 flex justify-between items-center">
                <div className="flex gap-2">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${i <= step ? 'bg-primary' : 'bg-default-200'
                                }`}
                        />
                    ))}
                </div>
                <div className="text-small text-default-500">
                    Step {step + 1} of 3
                </div>
            </div>

            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
            >
                {step === 0 && renderDetailsStep()}
                {step === 1 && renderQuestionsStep()}
                {step === 2 && renderResultsStep()}
            </motion.div>

            <div className="flex justify-between mt-8">
                <Button
                    isDisabled={step === 0}
                    variant="flat"
                    onPress={handleBack}
                >
                    Back
                </Button>
                {step < 2 ? (
                    <Button color="primary" onPress={handleNext}>
                        Next
                    </Button>
                ) : (
                    <Button color="success" className="text-white" onPress={handleSubmit}>
                        Create Diagnostic
                    </Button>
                )}
            </div>
        </div>
    );
}
