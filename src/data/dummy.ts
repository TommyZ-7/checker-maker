import { Diagnostic } from '@/types';

export const DUMMY_DIAGNOSTICS: Diagnostic[] = [
    {
        id: 'd1',
        title: 'あなたのリーダーシップスタイルは？',
        description: 'あなたの性格や好みに基づいて、どのようなリーダーシップスタイルを持っているかを発見しましょう。',
        createdAt: '2023-10-27T00:00:00Z',
        questions: [
            {
                id: 'q1',
                text: 'チームプロジェクトで対立が生じたとき、あなたはどうしますか？',
                choices: [
                    { id: 'c1a', text: '全員の話を聞き、妥協点を見つけようとする。', points: 2 },
                    { id: 'c1b', text: '迅速に決定を下し、チームを前進させる。', points: 3 },
                    { id: 'c1c', text: '対立を避け、自然に解決するのを待つ。', points: 1 },
                ]
            },
            {
                id: 'q2',
                text: '新しいタスクを割り当てるとき、何を重視しますか？',
                choices: [
                    { id: 'c2a', text: '各メンバーのスキルと興味に合わせてタスクを配分する。', points: 2 },
                    { id: 'c2b', text: '効率とスピードを最優先する。', points: 3 },
                    { id: 'c2c', text: 'ボランティアを募り、自主性に任せる。', points: 1 },
                ]
            },
            {
                id: 'q3',
                text: '成功したプロジェクトの後、どのように祝いますか？',
                choices: [
                    { id: 'c3a', text: 'チーム全体で食事に行き、全員の貢献を称える。', points: 2 },
                    { id: 'c3b', text: '次のプロジェクトに向けてすぐに準備を始める。', points: 3 },
                    { id: 'c3c', text: '個別に感謝のメールを送る。', points: 1 },
                ]
            }
        ],
        results: [
            {
                id: 'r1',
                title: 'サポーター型リーダー',
                description: 'あなたはチームの調和とメンバーの成長を重視するリーダーです。人々の意見を聞き、協力的な環境を作るのが得意です。',
                minPoints: 3,
                maxPoints: 5
            },
            {
                id: 'r2',
                title: '民主的リーダー',
                description: 'あなたは公平さとチームワークを大切にするリーダーです。全員が納得できる解決策を見つけるために努力します。',
                minPoints: 6,
                maxPoints: 7
            },
            {
                id: 'r3',
                title: '先導型リーダー',
                description: 'あなたは決断力があり、目標達成に向けてチームを力強く引っ張るリーダーです。困難な状況でも迷わずに行動できます。',
                minPoints: 8,
                maxPoints: 9
            }
        ]
    },
    {
        id: 'd2',
        title: 'あなたにぴったりのプログラミング言語は？',
        description: 'あなたの興味や働き方に最適なプログラミング言語を見つけましょう。',
        createdAt: '2023-10-27T00:00:00Z',
        questions: [
            {
                id: 'q1',
                text: 'どのようなものを作りたいですか？',
                choices: [
                    { id: 'c1a', text: '美しくてインタラクティブなウェブサイト。', points: 1 },
                    { id: 'c1b', text: '複雑なデータ分析や人工知能モデル。', points: 3 },
                    { id: 'c1c', text: '高性能なシステムやゲームエンジン。', points: 2 },
                ]
            },
            {
                id: 'q2',
                text: 'エラーに遭遇したとき、どう感じますか？',
                choices: [
                    { id: 'c2a', text: '視覚的にすぐに確認して修正したい。', points: 1 },
                    { id: 'c2b', text: '論理的なパズルとして楽しみながら解決する。', points: 3 },
                    { id: 'c2c', text: 'メモリ管理や低レベルの最適化に挑戦したい。', points: 2 },
                ]
            },
            {
                id: 'q3',
                text: 'どの企業で働きたいですか？',
                choices: [
                    { id: 'c3a', text: 'デザイン重視のスタートアップ。', points: 1 },
                    { id: 'c3b', text: 'データサイエンスや研究機関。', points: 3 },
                    { id: 'c3c', text: '大規模なシステム開発企業。', points: 2 },
                ]
            }
        ],
        results: [
            {
                id: 'r1',
                title: 'JavaScript / TypeScript',
                description: 'あなたはウェブ開発に向いています！視覚的なフィードバックを即座に得られる環境で、創造性を発揮できるでしょう。',
                minPoints: 3,
                maxPoints: 4
            },
            {
                id: 'r2',
                title: 'C++ / Rust',
                description: 'あなたはシステムプログラミングに向いています！パフォーマンスと制御を重視し、コンピュータの深層部を理解することに喜びを感じるでしょう。',
                minPoints: 5,
                maxPoints: 7
            },
            {
                id: 'r3',
                title: 'Python',
                description: 'あなたはデータサイエンスやAIに向いています！シンプルで強力な構文を使い、複雑な問題を解決することに情熱を注げるでしょう。',
                minPoints: 8,
                maxPoints: 9
            }
        ]
    }
];
