interface Message {
  id: string;
  uid: string;
  text: string;
  image_url: string | null;
  timestamp: string;
  sender: "admin" | "user";
}

interface SendMessageParams {
  uid: string;
  text: string;
  imageUrl: string | null;
}

interface UploadImageParams {
  uid: string;
  file: File;
}

interface HandleSendParams {
  text: string;
  imageFile: File | null;
}

export type { SendMessageParams, UploadImageParams, Message, HandleSendParams };
