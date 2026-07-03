import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center py-20">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Image
          src="/logo/nettuno-gold-emblem-180.png"
          alt="Emblema Nettuno Gold"
          width={180}
          height={202}
          className="h-20 w-auto opacity-80"
        />
        <span className="font-display text-6xl text-gold-gradient">404</span>
        <h1 className="font-display text-2xl md:text-3xl text-foreground">
          Questa pagina è andata all-in e non è tornata
        </h1>
        <p className="max-w-md text-muted">
          La pagina che cerchi non esiste o è stata spostata. Torna alla home o consulta
          il calendario tornei.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/">Torna alla home</Button>
          <Button href="/tornei" variant="secondary">
            Calendario tornei
          </Button>
        </div>
      </Container>
    </div>
  );
}
