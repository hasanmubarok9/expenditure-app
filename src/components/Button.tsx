type ButtonProps = {
  variant: "primary" | "secondary";
  text: string;
};
function Button({ variant, text }: ButtonProps) {
  return <button className={`py-4 px-6 text-white ${variant === 'primary' ? 'bg-blue-900' : 'bg-gray-900'}`}>{text}</button>;
}

export default Button;
