import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "@/firebaseConfig";
import { addDoc, Timestamp, collection } from "firebase/firestore";

interface PostMessageImageParams {
  uid: string;
  file: File;
}

interface PostMessageParams {
  uid: string;
  text: string;
  imageUrl: string | null;
}

async function postMessageImage({ uid, file }: PostMessageImageParams) {
  const imageRef = ref(storage, `chatImages/${uid}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(imageRef, file);
  const url = await getDownloadURL(snapshot.ref);
  return url;
}

async function postMessage({ uid, text, imageUrl }: PostMessageParams) {
  await addDoc(collection(db, "messages"), {
    sender: "user",
    uid,
    text,
    imageUrl,
    timestamp: Timestamp.now(),
  });
}

export { postMessageImage, postMessage };
