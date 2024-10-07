import {
  useMutation as useReactQueryMutation,
  useQueryClient,
  UseMutationOptions,
  InvalidateQueryFilters,
} from '@tanstack/react-query';

type CustomMutationOptions<TData, TError, TVariables, TContext> = {
  onSuccess?: ((
    data: TData,
    variables: TVariables,
    context: TContext | undefined
  ) => void)[];
  onError?: ((
    error: TError,
    variables: TVariables,
    context: TContext | undefined
  ) => void)[];
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
    context: TContext | undefined
  ) => void;
};

export const useCustomMutation = <TData, TError, TVariables, TContext>(
  key: InvalidateQueryFilters,
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: CustomMutationOptions<TData, TError, TVariables, TContext>
) => {
  const queryClient = useQueryClient();

  const mutationOptions: UseMutationOptions<
    TData,
    TError,
    TVariables,
    TContext
  > = {
    mutationFn,
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess.forEach((callback) =>
          callback(data, variables, context)
        );
      }
      queryClient.invalidateQueries(key);
    },
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError.forEach((callback) =>
          callback(error, variables, context)
        );
      }
    },
    onSettled: (data, error, variables, context) => {
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context);
      }
    },
  };

  return useReactQueryMutation<TData, TError, TVariables, TContext>(
    mutationOptions
  );
};
