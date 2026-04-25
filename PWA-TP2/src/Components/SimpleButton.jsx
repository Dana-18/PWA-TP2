export default function SimpleButton ({text, size, onClick}) {
  const sizeClasses = {
    sm: 'px-2 py-2 text-[12px] md:text-sm md:p-3',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg'
  };

  return (
    <button 
      className={`${sizeClasses[size] || sizeClasses.md} md:h-fit rounded-xl bg-gray-200 hover:bg-gray-300 active:bg-gray-400 hover:shadow-md active:scale-95 rounded-md text-gray-800 transition-all duration-300 ease-in-out cursor-pointer`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}