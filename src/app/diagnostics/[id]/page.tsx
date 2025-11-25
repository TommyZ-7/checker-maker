import { getDiagnostic } from '@/app/actions';
import DiagnosticRunner from '@/components/DiagnosticRunner';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function DiagnosticPlayPage({ params }: Props) {
    const { id } = await params;
    const diagnostic = await getDiagnostic(id);

    if (!diagnostic) {
        notFound();
    }

    return <DiagnosticRunner diagnostic={diagnostic} />;
}
