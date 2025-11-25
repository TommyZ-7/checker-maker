export interface Choice {
    id: string;
    text: string;
    points: number;
}

export interface Question {
    id: string;
    text: string;
    choices: Choice[];
}

export interface ResultDefinition {
    id: string;
    minPoints: number;
    maxPoints: number;
    title: string;
    description: string;
    imageUrl?: string; // Optional image for the result
}

export interface Diagnostic {
    id: string;
    title: string;
    description: string;
    questions: Question[];
    results: ResultDefinition[];
    createdAt: string;
}
