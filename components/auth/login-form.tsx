"use client";

import { Lock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Social } from "./social";

export const LoginForm = () => {
  return (
    <section
      data-testid="login-section"
      className="relative overflow-hidden bg-gradient-to-b from-secondary/15 via-white to-primary/10 pt-20 pb-0 min-h-[95vh] flex items-center"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-8 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute right-[-12%] bottom-[-18%] h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />
      </div>

      <div className="relative landing-container max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">
        <div className="hidden lg:block text-left space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-secondary/70">
            Connexion rapide
          </p>
          <h1 className="text-4xl font-bold text-secondary leading-snug">
            Authentifiez-vous en un clic.
          </h1>
          <p className="text-secondary/75 text-lg max-w-2xl">
            Google ou Facebook, sans mot de passe stocké. Accédez à l’espace
            privé en toute sécurité et retrouvez vos contenus.
          </p>
        </div>

        <div className="w-full flex justify-center">
          <Card className="w-full max-w-lg shadow-2xl border border-secondary/10 bg-white/95 backdrop-blur">
            <CardHeader className="space-y-3 text-center">
              <Badge className="bg-secondary text-white px-3 py-1 w-fit mx-auto">
                Espace privé
              </Badge>
              <CardTitle className="text-2xl text-secondary">
                Choisissez votre méthode
              </CardTitle>
              <p className="text-secondary/75">
                Les boutons ci-dessous sont vos portes d’entrée.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <Social />
              <div className="rounded-xl border border-secondary/10 bg-secondary/5 px-4 py-3 text-sm text-secondary/80 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-secondary" />
                  <span>Connexion OAuth sécurisée</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-secondary" />
                  <span>Aucun mot de passe stocké par l’école</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
