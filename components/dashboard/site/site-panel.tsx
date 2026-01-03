"use client";

import { useState, useTransition } from "react";
import { InfoSite } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { infoSiteSchema } from "@/schemas";
import { upsertInfoSite } from "@/actions/infosite";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, User, Globe2 } from "lucide-react";
import { InfoSiteData } from "@/data/infosite";
import { useRouter } from "next/navigation";

type Props = {
  info?: InfoSite | null;
};

export function SitePanel({ info }: Props) {
  const [snapshot, setSnapshot] = useState<InfoSiteData | null>(info ?? null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof infoSiteSchema>>({
    resolver: zodResolver(infoSiteSchema),
    defaultValues: snapshot || {
      siteName: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
      responsible: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof infoSiteSchema>) => {
    startTransition(() => {
      upsertInfoSite(values).then((res) => {
        if ("error" in res) {
          toast.error(res.error);
        } else {
          setSnapshot(values);
          form.reset(values);
          toast.success(res.success);
          router.refresh();
          setShowForm(false);
        }
      });
    });
  };

  const displayed = snapshot || info;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="h-full">
        <CardHeader className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Données actuelles
          </p>
          <CardTitle className="text-2xl text-secondary">
            Informations du site
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-secondary/90">
          {displayed ? (
            <>
              <Row
                icon={<Globe2 className="h-4 w-4" />}
                label="Nom"
                value={displayed.siteName}
              />
              <Row
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={displayed.email}
              />
              <Row
                icon={<MapPin className="h-4 w-4" />}
                label="Adresse"
                value={`${displayed.address}, ${displayed.postalCode} ${displayed.city}, ${displayed.country}`}
              />
              <Row
                icon={<Phone className="h-4 w-4" />}
                label="Téléphone"
                value={displayed.phone}
              />
              <Row
                icon={<User className="h-4 w-4" />}
                label="Responsable"
                value={displayed.responsible}
              />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Aucune information enregistrée pour le moment.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="h-full">
        <CardHeader className="space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Mise à jour
          </p>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-secondary">
              Modifier les informations
            </CardTitle>
            <Button
              type="button"
              variant={showForm ? "ghost" : "default"}
              size="sm"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? "Fermer" : "Ouvrir"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showForm && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du site</FormLabel>
                      <FormControl>
                        <Input placeholder="École Saint-Augustin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="contact@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresse</FormLabel>
                        <FormControl>
                          <Input placeholder="12 rue des Écoles" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Crémieu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code postal</FormLabel>
                        <FormControl>
                          <Input placeholder="38460" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays</FormLabel>
                        <FormControl>
                          <Input placeholder="France" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="04 74 ..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="responsible"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Responsable</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom du responsable" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Enregistrement..." : "Enregistrer"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

type RowProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function Row({ icon, label, value }: RowProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-secondary/10 bg-white/70 px-3 py-2">
      <span className="mt-1 h-8 w-8 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
        {icon}
      </span>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-semibold text-secondary/90">{value}</p>
      </div>
    </div>
  );
}
