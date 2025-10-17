import { Timestamp } from "firebase/firestore";

interface Message {
  id: string;
  uid: string;
  text: string;
  imageUrl: string | null;
  timestamp: Timestamp;
  sender: "admin" | "user";
}

export type { Message };
