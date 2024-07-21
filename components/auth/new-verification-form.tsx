'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { newVerification } from '@/actions/new-verification';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

type Props = {};

export const NewVerificationForm = (props: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const isInitialLoad = useRef(true);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!isInitialLoad.current) return;
    if (success || error) return;

    isInitialLoad.current = false;

    const onSubmit = async () => {
      if (!token) {
        setError('Missing token');
        return;
      }

      try {
        const data = await newVerification(token);
        setSuccess(data.success);
        setError(data.error);
      } catch (error) {
        setError('Something went wrong');
      }
    };

    onSubmit();
  }, [token, error, success]);

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Confirming your email verification"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
