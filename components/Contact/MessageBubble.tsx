import { formatTime } from "@/utils/messageUtils";

type MessageBubbleProps = {
  text: string;
  image_url: string | null;
  sender: "admin" | "user";
  timestamp: string;
  showTime: boolean;
  showProfile?: boolean;
};

export default function MessageBubble({
  text,
  image_url,
  sender,
  timestamp,
  showTime,
  showProfile = true,
}: MessageBubbleProps) {
  const isAdmin = sender === "admin";
  const isOnlyImageWithTimeStamp = !text && image_url && showTime;

  const baseClass = {
    admin: {
      base: "items-start",
      onlyImageWithTimeStamp: "!flex-row !items-end",
    },
    user: {
      base: "items-end",
      onlyImageWithTimeStamp: "!flex-row-reverse",
    },
  };
  const bubbleStyle =
    "break-words py-3 px-5 rounded-3xl max-w-[600px] block text-base xl:text-lg xl:px-6 xl:max-w-[840px] xl:rounded-[30px]";
  const imageStyle =
    "min-w-[100px] min-h-[100px] max-w-[600px] max-h-[200px] rounded-lg object-contain";
  const timestampStyle = "text-gray-30 body6";

  {
    return (
      <div className={`${isAdmin ? "flex flex-col" : "flex justify-end"}`}>
        {isAdmin && showProfile && (
          <div className="flex items-center gap-2 my-3">
            <div className="w-3 h-3 rounded-full bg-gray-10 xl:w-[14px] xl:h-[14px]" />
            <span className="text-gray-10 font-medium text-base xl:text-lg xl:font-semibold">
              YOUNG
            </span>
          </div>
        )}
        <div
          className={`flex flex-col gap-4 ${
            isAdmin ? baseClass.admin.base : baseClass.user.base
          } ${
            isOnlyImageWithTimeStamp
              ? isAdmin
                ? baseClass.admin.onlyImageWithTimeStamp
                : baseClass.user.onlyImageWithTimeStamp
              : ""
          }`}
        >
          {image_url && (
            <img
              src={image_url}
              alt={isAdmin ? "관리자 첨부 이미지" : "사용자 첨부 이미지"}
              className={`${imageStyle}`}
            />
          )}
          {!text && showTime && (
            <span className={`${timestampStyle}`}>
              {formatTime(new Date(timestamp))}
            </span>
          )}
          {text && (
            <div className="w-fit flex items-end">
              {!isAdmin && showTime && (
                <span className={`${timestampStyle} mr-3`}>
                  {formatTime(new Date(timestamp))}
                </span>
              )}
              <span
                className={`${bubbleStyle} ${
                  isAdmin
                    ? "bg-cool-gray-30 text-white"
                    : "bg-cool-gray-10 text-black"
                }`}
              >
                {text}
              </span>
              {isAdmin && showTime && (
                <span className={`${timestampStyle} ml-3`}>
                  {formatTime(new Date(timestamp))}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
