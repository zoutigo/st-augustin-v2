import { Button } from "@/components/ui/button";
import Link from "next/link";

export const LandingActivity = () => {
  return (
    <div className="text-4xl text-secondary py-[2rem] px-[1rem] bg-primary flex flex-col items-center justify-center gap-4">
      <div>
        <p className="font-cursive text-5xl tracking-wider font-semibold">
          {"Restez connectés à l'activité de l'école !"}
        </p>{" "}
      </div>
      <Link href="/blog" passHref>
        <Button
          type="button"
          className="min-w-full my-[1rem] text-secondary text-5xl opacity-50"
        >
          {" "}
          Visitez le Blog{" "}
        </Button>
      </Link>
    </div>
  );
};
