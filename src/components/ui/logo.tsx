
const Logo = () => {
  return (
    <div className="flex flex-row items-center justify-between  bg-transaprent bg-white gap-1 md:gap-3" data-theme="cmyk">
{/*<img
  src="/cesam.jpg"  // Mets le bon chemin ici
  alt="logo cesam"
  width={24} 
  height={24}
  className="w-6 h-6 text-primary md:mr-2"
/>*/}
      <h1 className=" text-lg flex md:text-3xl font-bold  first-letter:text-2xl    bg-clip-text text-transparent "
        style={{ backgroundImage: "linear-gradient(to right, #1671a3, #e63946, #f1c40f, #2ecc71,#1671a3)", }}
                                 >EventHouse</h1>
    </div>
  );
};

export default Logo;
