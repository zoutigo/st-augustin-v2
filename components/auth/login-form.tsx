"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";

export const LoginForm = () => {
  const user = useCurrentUser();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
  //   setError('');
  //   setSuccess('');

  //   startTransition(() => {
  //     if (user) {
  //       return setError('You are already logged in');
  //     }
  //     login(values).then((data) => {
  //       setError(data?.error);
  //       // setSuccess(data?.success);
  //     });
  //   });
  // };

  return (
    <CardWrapper
      headerLabel=""
      backButtonLabel="Accédez aux informations privées de l'école"
      backButtonHref="/"
      showSocial
    >
      {"Choisissez Google ou Facebook pour vous connecter."}
    </CardWrapper>
  );
};
