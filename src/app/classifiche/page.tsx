import type { Metadata } from "next";
import { getRankings } from "@/lib/data/rankings";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { formatDateIt } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Classifiche",
  description:
    "Classifica della Nettuno Gold Series e classifica generale annuale dei tornei di Nettuno Gold, Bologna.",
};

export default function ClassifichePage() {
  const rankings = getRankings();

  return (
    <>
      <PageHero
        eyebrow="Soci"
        title="Classifiche"
        subtitle="Classifica della serie in corso e classifica generale annuale, aggiornate dopo ogni tornei valido."
      />
      <div className="py-16 md:py-24">
      <Container className="flex flex-col gap-14">
        {rankings.map((ranking) => (
          <div key={ranking.slug} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-2xl md:text-3xl text-gold-gradient">
                {ranking.title}
              </h2>
              <span className="text-xs uppercase tracking-widest text-muted">
                Aggiornata al {formatDateIt(ranking.updatedAt)}
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-border-subtle">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="bg-surface text-xs uppercase tracking-widest text-muted">
                  <tr>
                    <th className="px-4 py-3">Pos.</th>
                    <th className="px-4 py-3">Giocatore</th>
                    <th className="px-4 py-3">Punti</th>
                    <th className="px-4 py-3">Eventi</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.standings.map((entry) => (
                    <tr key={entry.position} className="border-t border-border-subtle">
                      <td className="px-4 py-3 font-display text-lg text-gold-light">
                        {entry.position}
                      </td>
                      <td className="px-4 py-3 text-foreground">{entry.playerName}</td>
                      <td className="px-4 py-3">{entry.points}</td>
                      <td className="px-4 py-3">{entry.events}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <div className="rounded-lg border border-border-subtle bg-surface p-6 text-sm text-muted">
          <p>
            Dati mostrati a titolo dimostrativo: i punteggi reali verranno aggiornati dallo
            staff dopo ogni torneo valido per la classifica.
          </p>
        </div>

        <div className="flex justify-center">
          <Button href="/classifiche/regolamento" variant="secondary" size="lg">
            Leggi il regolamento
          </Button>
        </div>
      </Container>
      </div>
    </>
  );
}
