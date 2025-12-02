type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "primary-outline" | "secondary-outline";
  size?: "xl" | "lg" | "md" | "sm";
  circleButton?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  children: text,
  variant = "primary",
  size = "lg",
  circleButton = false,
  onClick,
  className = "",
}: ButtonProps) {
  const buttonColor = {
    primary: "bg-black text-white hover:bg-white hover:text-black",
    secondary: "bg-white text-black hover:bg-black hover:text-white",
    "primary-outline":
      "bg-transparent text-black border border-black hover:bg-black hover:text-white",
    "secondary-outline":
      "bg-transparent text-white border border-white hover:bg-white hover:text-black",
  };
  const buttonSize = {
    xl: `h3 !font-medium ${
      circleButton
        ? "w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-44 xl:h-44"
        : "px-10 py-4 lg:px-16 lg:py-6"
    }`,
    lg: `h4 !font-medium ${
      circleButton
        ? "w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36"
        : "px-8 py-3 lg:px-12 lg:py-5"
    }`,
    md: `body2 ${
      circleButton
        ? "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28"
        : "px-6 py-2 lg:px-8 lg:py-3"
    }`,
    sm: `body4 ${
      circleButton
        ? "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
        : "px-4 py-2 lg:px-6"
    }`,
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
