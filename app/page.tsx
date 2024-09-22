import { Button } from '@/components/ui/button';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import LoginButton from '@/components/auth/login-button';
import { Landing } from '@/components/landing/landing';

const font = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});
export default function Home() {
  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

  if (!NEXTAUTH_SECRET) {
    console.log('NEXTAUTH_SECRET environment variable is not defined');
  }
  return (
    <div className="w-full h-full">
      <Landing />
    </div>
    // <main className="flex h-full flex-col items-center justify-center bg-sky-500">
    //   <div className="space-y-6 text-center">
    //     <h1
    //       className={cn(
    //         'text-6xl font-semibold text-white drop-shadow-md',
    //         font.className
    //       )}
    //     >
    //       🔐 Auth
    //     </h1>
    //     <p className="text-white text-lg"> Simple authentication service</p>
    //   </div>
    //   <div>
    //     <LoginButton mode="modal" asChild>
    //       <Button variant="secondary" size="lg">
    //         SignIn
    //       </Button>
    //     </LoginButton>
    //   </div>
    // </main>
  );
}
