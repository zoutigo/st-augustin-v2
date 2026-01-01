import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export interface LandingFavoriteCardProps {
  title: string;
  icon: React.ElementType;
  text: string;
  path: string;
  accent?: string;
}

export const LandingFavoriteCard = ({
  title,
  text,
  icon: Icon,
  path,
  accent,
}: LandingFavoriteCardProps) => {
  const isDark =
    accent?.includes("bg-secondary") || accent?.includes("text-white");
  const titleColor = isDark ? "text-white" : "text-secondary";
  const bodyColor = isDark ? "text-white/85" : "text-secondary";
  const buttonClasses = isDark
    ? "bg-white text-secondary hover:bg-white/90"
    : "bg-secondary text-white hover:brightness-110";

  return (
    <Card
      className={`h-full flex flex-col rounded-2xl shadow-md border-none transition-transform duration-300 hover:-translate-y-1 ${
        accent ?? "bg-white"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-3 pb-2">
        <div className="rounded-full bg-white/40 p-3">
          <Icon className="text-3xl" />
        </div>
        <span className="text-secondary text-sm uppercase tracking-[0.2em]">
          Info clé
        </span>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div
          className={`text-left font-semibold text-2xl uppercase leading-snug ${titleColor}`}
        >
          {title}
        </div>
        <div className={`text-base leading-relaxed opacity-80 ${bodyColor}`}>
          {text}
        </div>
      </CardContent>
      <CardFooter className="mt-auto pt-0">
        <Link href={path} className="w-full">
          <Button
            className={`w-full flex items-center justify-between group ${buttonClasses}`}
          >
            <span className="font-semibold">Découvrir</span>
            <span className="group-hover:translate-x-1 transition">→</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
