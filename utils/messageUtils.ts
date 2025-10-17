import { Timestamp } from "firebase/firestore";
import { Message } from "@/types/inquiry";

interface messageDisplayMetaParams {
  msg: Message;
  messages: Message[];
  index: number;
}

function formatDateHeader(timestamp: Timestamp) {
  const date = timestamp.toDate();
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timestamp: Timestamp) {
  const date = timestamp.toDate();
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isSameMinute(a: Timestamp, b: Timestamp) {
  const aDate = a.toDate();
  const bDate = b.toDate();
  return (
    aDate.getFullYear() === bDate.getFullYear() &&
    aDate.getMonth() === bDate.getMonth() &&
    aDate.getDate() === bDate.getDate() &&
    aDate.getHours() === bDate.getHours() &&
    aDate.getMinutes() === bDate.getMinutes()
  );
}

function isSameDay(a: Timestamp, b: Timestamp) {
  const aDate = a.toDate();
  const bDate = b.toDate();
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

  const showDate = index === 0 || !isSameDay(msg.timestamp, prev.timestamp);
  const showTime =
    !next ||
    !isSameMinute(msg.timestamp, next.timestamp) ||
    msg.sender !== next.sender;
  const showProfile =
    msg.sender === "admin" &&
    (!prev ||
      prev.sender !== "admin" ||
      !isSameMinute(msg.timestamp, prev.timestamp));
  return { showDate, showTime, showProfile };
}

export {
  formatDateHeader,
  formatTime,
  isSameMinute,
  isSameDay,
  messageDisplayMeta,
};
