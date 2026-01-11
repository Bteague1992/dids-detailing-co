import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container maxWidth="2xl" className="text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button asChild size="lg">
          <Link href="/">Go Home</Link>
        </Button>
      </Container>
    </div>
  );
}
