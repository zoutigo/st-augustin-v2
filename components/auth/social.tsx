"use client";
import { signIn } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Social = () => {
  const user = useCurrentUser();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const showFacebook = process.env.NODE_ENV !== "production";
  const onClick = (provider: "google" | "facebook") => {
    // if (user) {
    //   console.log('user', user);
    //   return redirect(callbackUrl || '/');
    // }
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      {showFacebook && (
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={() => onClick("facebook")}
        >
          <FaFacebook className="h-5 w-5 text-[#1877F2]" />
        </Button>
      )}
    </div>
  );
};
