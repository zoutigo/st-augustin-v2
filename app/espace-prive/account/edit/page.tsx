"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { updateUserProfile } from "@/actions/users/post";
import { userProfileUpdateSchema } from "@/schemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect } from "react";

type ProfileFormValues = z.infer<typeof userProfileUpdateSchema>;

export default function EditProfilePage() {
  const user = useCurrentUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(userProfileUpdateSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
    },
  });

  // Remplissage des valeurs du formulaire dès que `user` est disponible
  useEffect(() => {
    if (user) {
      setValue("firstname", user.firstname || "");
      setValue("lastname", user.lastname || "");
      setValue("phone", user.phone || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data: ProfileFormValues) => {
    const response = await updateUserProfile(data);

    if ("error" in response) {
      toast.error(response.error);
    } else {
      setTimeout(() => {
        router.push("/espace-prive/account");
      }, 1000);
      toast.success(response.success);
      router.refresh();
    }
  };

  if (!user) {
    return <p className="text-center text-gray-600">Chargement...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-primary">
          Modifier Profil
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Nom
              </label>
              <Input
                {...register("lastname")}
                placeholder="Votre nom"
                className="w-full"
              />
              {errors.lastname && (
                <p className="text-red-500">{errors.lastname.message}</p>
              )}
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Prénom
              </label>
              <Input
                {...register("firstname")}
                placeholder="Votre prénom"
                className="w-full"
              />
              {errors.firstname && (
                <p className="text-red-500">{errors.firstname.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Téléphone
            </label>
            <Input
              {...register("phone")}
              placeholder="Votre numéro de téléphone"
              className="w-full"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Email
            </label>
            <Input
              value={user.email ?? "mail manquant"}
              disabled
              className="w-full bg-gray-200 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Rôle
              </label>
              <Input
                value={user.role}
                disabled
                className="w-full bg-gray-200 text-gray-600 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700">
                Grade
              </label>
              <Input
                value={user.grade}
                disabled
                className="w-full bg-gray-200 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Link href="/espace-prive/account">
              <Button
                variant="outline"
                className="bg-red-300 text-secondary min-w-[10rem]"
              >
                Annuler
              </Button>
            </Link>
            <Button
              type="submit"
              className="text-secondary min-w-[10rem] uppercase"
            >
              Enregistrer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
