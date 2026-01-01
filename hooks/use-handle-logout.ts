import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

import { DEFAULT_LOGOUT_REDIRECT } from "@/routes";

export const useHandleLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false }); // Redirection après déconnexion
      toast.success("Déconnexion réussie !", { duration: 3000 });
      setTimeout(() => {
        router.push(DEFAULT_LOGOUT_REDIRECT);
      }, 3000);
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la déconnexion.");

      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return { handleLogout };
};
