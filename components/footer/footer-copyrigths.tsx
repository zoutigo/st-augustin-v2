export const FooterCopyrigths: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-white my-[0.5rem] px-3 text-xl font-cursive">
      <span className="mr-[2rem]"> Ecole Saint Augustin {year} </span>
      <span className="mr-[2rem]"> Tous droits réservés.</span>
      <span className="mr-[2rem]"> Conception bénévole</span>
    </div>
  );
};
