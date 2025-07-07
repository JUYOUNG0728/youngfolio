import Image from "next/image";

export default function SoundButton({
  soundOn,
  setSoundOn,
}: {
  soundOn: boolean;
  setSoundOn: (soundOn: boolean) => void;
}) {
  return (
    <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center">
      <Image
        src={
          soundOn ? "/images/icon-sound-on.png" : "/images/icon-sound-off.png"
        }
        alt="Sound"
        width={20}
        height={20}
        className="cursor-pointer"
        onClick={() => setSoundOn(!soundOn)}
      />
    </div>
  );
}
