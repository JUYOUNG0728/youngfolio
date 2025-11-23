type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "primaryOutline" | "secondaryOutline";
  size?: "xl" | "lg" | "md" | "sm";
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children: text,
  variant = "primary",
  size = "lg",
  onClick,
  className = "",
}: ButtonProps) {
  const buttonColor = {
    primary: "bg-black text-white hover:bg-white hover:text-black",
    secondary: "bg-white text-black hover:bg-black hover:text-white",
    primaryOutline:
      "bg-transparent text-black border border-black hover:bg-black hover:text-white",
    secondaryOutline:
      "bg-transparent text-white border border-white hover:bg-white hover:text-black",
  };
  const buttonSize = {
    xl: "",
    lg: "body3 px-[70px] py-[20px] xl:px-[84px] xl:py-[26px]",
    md: "",
    sm: "",
  };
  return (
    <button
      className={`${buttonSize[size]} ${buttonColor[variant]} font-semibold rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
