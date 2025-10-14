import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";

export default async function uploadImage(userUid: string, file: File) {
  const imageRef = ref(
    storage,
    `chatImages/${userUid}/${Date.now()}_${file.name}`
  );
  const snapshot = await uploadBytes(imageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}
