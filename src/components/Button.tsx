type ButtonProps = {
  variant: "primary" | "secondary";
  text: string;
  className?: string;
  onClick: () => void;
};
function Button({ variant, text, className, onClick }: ButtonProps) {
  return (
    <button
      className={`py-2 px-4 text-white rounded-sm ${
        variant === "primary" ? "bg-blue-900" : "bg-gray-400"
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
