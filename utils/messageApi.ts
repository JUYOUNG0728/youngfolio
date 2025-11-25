import { supabase } from "@/lib/supabaseClient";
import type {
  SendMessageParams,
  UploadImageParams,
  FetchMessagesParams,
} from "@/types/inquiry";

async function fetchMessages({ uid }: FetchMessagesParams) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("uid", uid)
    .order("timestamp", { ascending: true });

  if (error) {
    console.error(error);
    alert("메시지 불러오기에 실패했습니다.");
    throw error;
  }
  return data;
}

async function postMessage({ uid, text, imageUrl, sender }: SendMessageParams) {
  const { error } = await supabase.from("messages").insert({
    sender,
    uid,
    text,
    image_url: imageUrl,
  });
  if (error) {
    console.error(error);
    alert("메시지 전송에 실패했습니다.");
    throw error;
  }
}

async function postImage({
  uid,
  file,
}: UploadImageParams): Promise<string | null> {
  const safeFileName = file.name.replace(/[^\w.-]/g, "_").toLowerCase();

  const filePath = `chatImages/${uid}/${Date.now()}_${safeFileName}`;

  const { error } = await supabase.storage
    .from("chat-images")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("이미지 업로드 실패 :", error);
    alert("이미지 업로드에 실패했습니다.");
    return null;
  }

  const { data } = supabase.storage.from("chat-images").getPublicUrl(filePath);

  return data.publicUrl;
}

export { fetchMessages, postMessage, postImage };
