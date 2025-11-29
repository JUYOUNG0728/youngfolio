import { Message } from "@/types/inquiry";

type messageDisplayMetaParams = {
  msg: Message;
  messages: Message[];
  index: number;
};

function formatDateHeader(timestamp: Date) {
  return timestamp.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timestamp: Date) {
  return timestamp.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isSameMinute(aDate: Date, bDate: Date) {
  return (
    aDate.getFullYear() === bDate.getFullYear() &&
    aDate.getMonth() === bDate.getMonth() &&
    aDate.getDate() === bDate.getDate() &&
    aDate.getHours() === bDate.getHours() &&
    aDate.getMinutes() === bDate.getMinutes()
  );
}

function isSameDay(aDate: Date, bDate: Date) {
  return (
    aDate.getFullYear() === bDate.getFullYear() &&
    aDate.getMonth() === bDate.getMonth() &&
    aDate.getDate() === bDate.getDate()
  );
}

function messageDisplayMeta({
  msg,
  messages,
  index,
}: messageDisplayMetaParams) {
  const prev = messages[index - 1];
  const next = messages[index + 1];

  const showDate =
    index === 0 ||
    !isSameDay(new Date(msg.timestamp), new Date(prev.timestamp));
  const showTime =
    !next ||
    !isSameMinute(new Date(msg.timestamp), new Date(next.timestamp)) ||
    msg.sender !== next.sender;
  const showProfile =
    msg.sender === "admin" &&
    (!prev ||
      prev.sender !== "admin" ||
      !isSameMinute(new Date(msg.timestamp), new Date(prev.timestamp)));
  return { showDate, showTime, showProfile };
}

export {
  formatDateHeader,
  formatTime,
  isSameMinute,
  isSameDay,
  messageDisplayMeta,
};
