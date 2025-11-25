import { Diagnostic, Question, Choice, ResultDefinition } from '@/types';

export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 1000;
export const MAX_QUESTION_TEXT_LENGTH = 200;
export const MAX_CHOICE_TEXT_LENGTH = 100;
export const MAX_RESULT_TITLE_LENGTH = 100;
export const MAX_RESULT_DESCRIPTION_LENGTH = 1000;

export function sanitizeText(text: string): string {
    if (!text) return text;
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/\//g, '&#47;')
        .replace(/{/g, '&#123;')
        .replace(/}/g, '&#125;');
}

export function validateDiagnostic(diagnostic: Diagnostic): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!diagnostic.title || diagnostic.title.length > MAX_TITLE_LENGTH) {
        errors.push(`タイトルは必須で、${MAX_TITLE_LENGTH}文字以内である必要があります。`);
    }
    if (!diagnostic.description || diagnostic.description.length > MAX_DESCRIPTION_LENGTH) {
        errors.push(`説明は必須で、${MAX_DESCRIPTION_LENGTH}文字以内である必要があります。`);
    }

    diagnostic.questions.forEach((q, i) => {
        if (!q.text || q.text.length > MAX_QUESTION_TEXT_LENGTH) {
            errors.push(`質問 ${i + 1} のテキストは必須で、${MAX_QUESTION_TEXT_LENGTH}文字以内である必要があります。`);
        }
        q.choices.forEach((c, j) => {
            if (!c.text || c.text.length > MAX_CHOICE_TEXT_LENGTH) {
                errors.push(`質問 ${i + 1} の選択肢 ${j + 1} のテキストは必須で、${MAX_CHOICE_TEXT_LENGTH}文字以内である必要があります。`);
            }
        });
    });

    diagnostic.results.forEach((r, i) => {
        if (!r.title || r.title.length > MAX_RESULT_TITLE_LENGTH) {
            errors.push(`結果 ${i + 1} のタイトルは必須で、${MAX_RESULT_TITLE_LENGTH}文字以内である必要があります。`);
        }
        if (!r.description || r.description.length > MAX_RESULT_DESCRIPTION_LENGTH) {
            errors.push(`結果 ${i + 1} の説明は必須で、${MAX_RESULT_DESCRIPTION_LENGTH}文字以内である必要があります。`);
        }
    });

    return {
        valid: errors.length === 0,
        errors,
    };
}

export function sanitizeDiagnostic(diagnostic: Diagnostic): Diagnostic {
    return {
        ...diagnostic,
        title: sanitizeText(diagnostic.title),
        description: sanitizeText(diagnostic.description),
        questions: diagnostic.questions.map(q => ({
            ...q,
            text: sanitizeText(q.text),
            choices: q.choices.map(c => ({
                ...c,
                text: sanitizeText(c.text),
            })),
        })),
        results: diagnostic.results.map(r => ({
            ...r,
            title: sanitizeText(r.title),
            description: sanitizeText(r.description),
        })),
    };
}
