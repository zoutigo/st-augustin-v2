export const useSession = jest.fn(() => {
  return { data: null, status: "unauthenticated" };
});

export const signIn = jest.fn();
export const signOut = jest.fn();
