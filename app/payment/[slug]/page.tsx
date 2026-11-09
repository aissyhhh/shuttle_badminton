import { notFound } from "next/navigation";
import { RegistrationPayment } from "@/components/RegistrationPayment";
import { tournaments } from "@/lib/tournaments";

interface PageProps { params: Promise<{ slug: string }> }

export default async function PaymentRoute({ params }: PageProps) {
    const { slug } = await params;
    const tournament = tournaments.find(
        (tournament) => tournament.id === slug
    );

    if (!tournament) {
        notFound();
    }

    return (
        <RegistrationPayment tournament={tournament}/>
    );
}