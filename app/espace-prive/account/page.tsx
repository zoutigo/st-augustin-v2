'use server';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Utilisation de shadcn button
import { currentUser } from '@/lib/auth';

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-2xl text-red-500">
          Vous devez être connecté pour voir cette page.
        </p>
        <Link href="/auth/login">
          <Button className="ml-4">Se connecter</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-semibold text-center text-primary">
          Profil Utilisateur
        </h1>

        <div className="flex flex-col items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt="Photo de profil"
              width={150}
              height={150}
              className="rounded-full border-4 border-primary"
            />
          ) : (
            <div className="w-36 h-36 rounded-full border-4 border-gray-300 flex items-center justify-center bg-gray-200 text-gray-500">
              Aucun image
            </div>
          )}

          <h2 className="text-2xl font-medium text-gray-800">
            {user.firstname || 'Utilisateur'} {user.lastname || ''}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-lg font-semibold">Nom :</p>
            <p>{user.lastname || 'Non renseigné'}</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-lg font-semibold">Prénom :</p>
            <p>{user.firstname || 'Non renseigné'}</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-lg font-semibold">Email :</p>
            <p>{user.email || 'Non renseigné'}</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-lg font-semibold">Téléphone :</p>
            <p>{user.phone || 'Non renseigné'}</p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-lg font-semibold">Rôle :</p>
            <p className="uppercase text-primary font-bold">
              {user.role || 'Non défini'}
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50">
            <p className="text-lg font-semibold">Grade :</p>
            <p className="uppercase text-secondary font-bold">
              {user.grade || 'Non défini'}
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/espace-prive/account/edit">
            <Button className="mt-4 text-secondary min-w-[300px] text-xl uppercase tracking-widest">
              Modifier
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
