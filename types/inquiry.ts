interface Message {
  id: string;
  uid: string;
  text: string;
  image_url: string | null;
  timestamp: string;
  sender: "admin" | "user";
}

interface FetchMessagesParams {
  uid: string;
}

interface SendMessageParams {
  uid: string;
  text: string;
  imageUrl: string | null;
  sender: "admin" | "user";
}

interface UploadImageParams {
  uid: string;
  file: File;
}

interface HandleSendParams {
  text: string;
  imageFile: File | null;
}

export type {
  Message,
  SendMessageParams,
  UploadImageParams,
  HandleSendParams,
  FetchMessagesParams,
};
