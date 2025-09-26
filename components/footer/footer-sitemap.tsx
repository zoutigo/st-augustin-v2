import Link from 'next/link';
import { NavRoutes } from '@/routes';

export const FooterSitemap: React.FC = () => {
  // Filtrer les sections publiques utiles au SEO
  const sections = NavRoutes.filter((r) =>
    ['ecole', 'vie-scolaire', 'classes', 'blog'].includes(r.slug)
  );

  return (
    <div className="bg-secondary-dark/40">
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sections.map((section) => {
          if (section.slug === 'classes' && section.subroutes) {
            const left = section.subroutes.slice(0, 4);
            const right = section.subroutes.slice(4, 8);
            return (
              <div key={section.slug} className="min-w-0 sm:col-span-2 md:col-span-2">
                <h3 className="text-white font-semibold uppercase tracking-wide mb-3 text-base sm:text-lg">
                  <Link href={section.path}>{section.name}</Link>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                  <ul className="space-y-2">
                    {left.map((s) => (
                      <li key={s.path} className="text-white/90 text-sm sm:text-base">
                        <Link href={s.path}>{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {right.map((s) => (
                      <li key={s.path} className="text-white/90 text-sm sm:text-base">
                        <Link href={s.path}>{s.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          }

          // Ecole et Vie scolaire: blocs distincts côte à côte en sm
          return (
            <div key={section.slug} className="min-w-0">
              <h3 className="text-white font-semibold uppercase tracking-wide mb-3 text-base sm:text-lg">
                <Link href={section.path}>{section.name}</Link>
              </h3>
              {section.subroutes && (
                <ul className="space-y-2">
                  {section.subroutes.map((s) => (
                    <li key={s.path} className="text-white/90 text-sm sm:text-base">
                      <Link href={s.path}>{s.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
