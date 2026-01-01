"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ROUTES_TO_PREFETCH = ["/ecole", "/classes", "/vie-scolaire", "/blog"];

export const LandingPrefetch = () => {
  const router = useRouter();

  useEffect(() => {
    ROUTES_TO_PREFETCH.forEach((route) => router.prefetch(route));

    let aborted = false;
    const controller = new AbortController();

    fetch("/api/prefetch", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data || aborted) return;
        const entitySlugs: string[] = data.entitySlugs || [];
        const imageHints: string[] = data.imageHints || [];

        const urls = Array.from(
          new Set([
            ...imageHints,
            ...entitySlugs.map((slug) => `/images/${slug}.jpg`),
          ]),
        );

        urls.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      })
      .catch(() => {
        // silence errors in background prefetch
      });

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [router]);

  return null;
};
