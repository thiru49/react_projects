export const Button = ({ children, onClick }) => {
  return (
    <button
      className="p-1.5 bg-amber-600 font-serif font-bold rounded-md text-sm hover:bg-amber-300 transition-all "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
