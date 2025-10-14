import { Timestamp } from "firebase/firestore";

const formatDateHeader = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (timestamp: Timestamp) => {
  const date = timestamp.toDate();
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const isSameMinute = (a: Timestamp, b: Timestamp) => {
  const aDate = a.toDate();
  const bDate = b.toDate();
  return (
    aDate.getFullYear() === bDate.getFullYear() &&
    aDate.getMonth() === bDate.getMonth() &&
    aDate.getDate() === bDate.getDate() &&
    aDate.getHours() === bDate.getHours() &&
    aDate.getMinutes() === bDate.getMinutes()
  );
};

const isSameDay = (a: Timestamp, b: Timestamp) => {
  const aDate = a.toDate();
  const bDate = b.toDate();
  return (
    aDate.getFullYear() === bDate.getFullYear() &&
    aDate.getMonth() === bDate.getMonth() &&
    aDate.getDate() === bDate.getDate()
  );
};

export { formatDateHeader, formatTime, isSameMinute, isSameDay };
