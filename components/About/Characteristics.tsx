import Image from "next/image";

type CharacteristicsProps = {
  strength: { name: string; eng: string; icon: string };
  index: number;
};

export default function Characteristics({
  strength,
  index,
}: CharacteristicsProps) {
  return (
    <div
      className="group bg-white rounded-xl flex w-full items-center gap-8 relative p-6 lg:px-10 lg:py-9 xl:gap-12 xl:px-12 xl:py-10 hover:scale-105 hover:bg-marine-blue hover:glow-1"
      style={{ transition: "transform 0.3s ease" }}
    >
      {index < 2 && (
        <Image
          src="/images/icon-crown.png"
          alt="왕관"
          width={60}
          height={60}
          className="absolute top-[-30px] left-0"
        />
      )}
      <span className="h2 tracking-tight text-black !font-semibold group-hover:text-white">
        0{index + 1}
      </span>
      <div className="flex flex-col gap-2.5 lg:gap-3.5">
        <h2 className="h4 text-black leading-[1.3] group-hover:text-white">
          {strength.name}
        </h2>
        <span className="body3 text-gray-30 font-medium !leading-[1.4] group-hover:text-white">
          {strength.eng}
        </span>
      </div>
    </div>
  );
}
