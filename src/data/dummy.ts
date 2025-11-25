import { Diagnostic } from '@/types';

export const DUMMY_DIAGNOSTICS: Diagnostic[] = [
    {
        id: 'diag_1',
        title: 'Professional Work Style Assessment',
        description: 'Discover your ideal working environment and professional strengths through this quick assessment.',
        createdAt: new Date().toISOString(),
        questions: [
            {
                id: 'q1',
                text: 'When faced with a complex problem, what is your first instinct?',
                choices: [
                    { id: 'c1_1', text: 'Break it down into smaller, manageable tasks immediately.', points: 10 },
                    { id: 'c1_2', text: 'Brainstorm with a team to get diverse perspectives.', points: 20 },
                    { id: 'c1_3', text: 'Research similar problems and their solutions.', points: 15 },
                    { id: 'c1_4', text: 'Trust your gut and start experimenting with solutions.', points: 5 },
                ],
            },
            {
                id: 'q2',
                text: 'How do you prefer to receive feedback?',
                choices: [
                    { id: 'c2_1', text: 'Direct and blunt, so I can fix things quickly.', points: 10 },
                    { id: 'c2_2', text: 'In a private, one-on-one setting with constructive examples.', points: 20 },
                    { id: 'c2_3', text: 'Written down so I can reflect on it later.', points: 15 },
                    { id: 'c2_4', text: 'I prefer to self-evaluate before hearing from others.', points: 5 },
                ],
            },
            {
                id: 'q3',
                text: 'What motivates you the most at work?',
                choices: [
                    { id: 'c3_1', text: 'Clear goals and measurable achievements.', points: 10 },
                    { id: 'c3_2', text: 'Building strong relationships with colleagues.', points: 20 },
                    { id: 'c3_3', text: 'Learning new skills and gaining knowledge.', points: 15 },
                    { id: 'c3_4', text: 'Having the freedom to be creative and innovate.', points: 5 },
                ],
            },
        ],
        results: [
            {
                id: 'r1',
                minPoints: 0,
                maxPoints: 25,
                title: 'The Independent Trailblazer',
                description: 'You thrive on autonomy and quick decision-making. You prefer to trust your instincts and learn by doing.',
            },
            {
                id: 'r2',
                minPoints: 26,
                maxPoints: 40,
                title: 'The Strategic Analyst',
                description: 'You value structure, research, and clear goals. You approach problems methodically and appreciate detailed feedback.',
            },
            {
                id: 'r3',
                minPoints: 41,
                maxPoints: 60,
                title: 'The Collaborative Diplomat',
                description: 'You are a people person who excels in team environments. You value consensus, relationships, and shared success.',
            },
        ],
    },
    {
        id: 'diag_2',
        title: 'Creative Personality Type',
        description: 'Are you a Visionary, a Maker, or a Curator? Find out now!',
        createdAt: new Date().toISOString(),
        questions: [
            {
                id: 'q1',
                text: 'You have a free Saturday afternoon. What do you do?',
                choices: [
                    { id: 'c1_1', text: 'Visit an art gallery or museum.', points: 5 },
                    { id: 'c1_2', text: 'Start a new DIY project.', points: 10 },
                    { id: 'c1_3', text: 'Daydream about future possibilities.', points: 15 },
                    { id: 'c1_4', text: 'Organize your workspace.', points: 0 },
                ],
            },
            {
                id: 'q2',
                text: 'Which tool appeals to you most?',
                choices: [
                    { id: 'c2_1', text: 'A blank sketchbook.', points: 15 },
                    { id: 'c2_2', text: 'A high-quality camera.', points: 5 },
                    { id: 'c2_3', text: 'A set of precision tools.', points: 10 },
                    { id: 'c2_4', text: 'A label maker.', points: 0 },
                ],
            },
        ],
        results: [
            {
                id: 'r1',
                minPoints: 0,
                maxPoints: 10,
                title: 'The Curator',
                description: 'You have an eye for beauty and order. You excel at selecting and arranging things to create meaning.',
            },
            {
                id: 'r2',
                minPoints: 11,
                maxPoints: 20,
                title: 'The Maker',
                description: 'You love to build and create with your hands. You find satisfaction in the tangible results of your work.',
            },
            {
                id: 'r3',
                minPoints: 21,
                maxPoints: 30,
                title: 'The Visionary',
                description: 'You live in the world of ideas. You are constantly imagining what could be and inspiring others with your vision.',
            },
        ],
    },
];
