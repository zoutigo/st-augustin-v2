export const FooterCopyrigths: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-white py-3 px-4 border-t border-secondary/10">
      <div className="max-w-6xl mx-auto text-center text-secondary space-y-1">
        <span className="block text-base sm:text-lg font-semibold">
          © {year} École Saint Augustin – Tous droits réservés
        </span>
        <span className="block text-sm sm:text-base text-secondary/80">
          Conception bénévole
        </span>
      </div>
    </div>
  );
};
