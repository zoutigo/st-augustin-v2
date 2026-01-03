import { db } from "@/lib/db";
import defaultInfo from "@/lib/data/info-site.json";

export type InfoSiteData = {
  siteName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  responsible: string;
};

const fallbackInfo = defaultInfo as InfoSiteData;

export const getInfoSite = async () => {
  try {
    const record = await db.infoSite.findFirst();
    return record;
  } catch (error) {
    console.error("Erreur getInfoSite", error);
    return null;
  }
};

export const getInfoSiteOrFallback = async (): Promise<InfoSiteData> => {
  const record = await getInfoSite();
  if (record) {
    return {
      siteName: record.siteName,
      email: record.email,
      address: record.address,
      city: record.city,
      postalCode: record.postalCode,
      country: record.country,
      phone: record.phone,
      responsible: record.responsible,
    };
  }
  return fallbackInfo;
};
