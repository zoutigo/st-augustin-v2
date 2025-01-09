'use client';
import { signIn } from 'next-auth/react';
import { redirect, useSearchParams } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { useCurrentUser } from '@/hooks/use-current-user';

export const Social = () => {
  const user = useCurrentUser();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const onClick = (provider: 'google' | 'facebook') => {
    // if (user) {
    //   console.log('user', user);
    //   return redirect(callbackUrl || '/');
    // }
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      {/* <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick('facebook')}
      >
        <FaGithub className="h-5 w-5" />
      </Button> */}
    </div>
  );
};
