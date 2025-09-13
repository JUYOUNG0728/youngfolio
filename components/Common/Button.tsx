export default function Button({
  text,
  variant = "primary",
  size = "lg",
  onClick,
  className = "",
}: {
  text: string;
  variant?: "primary" | "secondary" | "primaryOutline" | "secondaryOutline";
  size?: "xl" | "lg" | "md" | "sm";
  onClick?: () => void;
  className?: string;
}) {
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
    lg: "body3 px-[70px] py-[24px] xl:px-[84px] xl:py-[32px]",
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
