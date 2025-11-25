import { DUMMY_DIAGNOSTICS } from '@/data/dummy';
import DiagnosticRunner from '@/components/DiagnosticRunner';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function DiagnosticPlayPage({ params }: Props) {
    const { id } = await params;
    const diagnostic = DUMMY_DIAGNOSTICS.find((d) => d.id === id);

    if (!diagnostic) {
        notFound();
    }

    return <DiagnosticRunner diagnostic={diagnostic} />;
}
