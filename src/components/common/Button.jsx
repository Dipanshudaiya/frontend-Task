const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-red-800 px-3 py-2 rounded hover:bg-gray-300 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;