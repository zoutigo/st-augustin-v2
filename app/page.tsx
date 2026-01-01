// import { Poppins } from 'next/font/google';
import { Landing } from "@/components/landing/landing";

// const font = Poppins({
//   subsets: ['latin'],
//   weight: ['600'],
// });
export default function Home() {
  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

  if (!NEXTAUTH_SECRET) {
    console.log("NEXTAUTH_SECRET environment variable is not defined");
  }
  return (
    <div className="w-full h-full">
      <Landing />
    </div>
  );
}
