import Link from "next/link";
import { H1, P } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ArrowRight, CircleAlert } from "lucide-react";

export default function page() {
  return (
    <div style={{}}>
      <div className="mx-auto max-w-3xl py-10 text-center">
        <P className="mx-auto my-5 w-fit rounded-full bg-muted px-4">
          <Link href="/pricing" className="text-blue-500">
            🎉 Get 50%
          </Link>{" "}
          off now <span className="text-green-500">3 days</span> left
        </P>
        <H1>Next Gen Account Management Software</H1>
        <P className="py-10 text-muted-foreground">
          An awesome and powerful tool to manage your accounts in which will
          boost your page performance
        </P>
        <div className="flex items-center justify-center gap-4">
          <Button asChild>
            <Link className="flex gap-2" href="/login">
              Get Started
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button variant="outline" className="flex gap-2 bg-muted">
            Learn more
            <CircleAlert size={16} />
          </Button>
        </div>
      </div>
      <img src="/hero.svg" className="mx-auto lg:w-[80%]" alt="" />
    </div>
  );
}
