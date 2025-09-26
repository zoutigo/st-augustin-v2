export const FooterCopyrigths: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-white py-2 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <span className="block text-base sm:text-lg font-cursive">Ecole Saint Augustin {year}</span>
        <span className="block text-base sm:text-lg font-cursive">Tous droits réservés.</span>
        <span className="block text-base sm:text-lg font-cursive">Conception bénévole</span>
      </div>
    </div>
  );
};
