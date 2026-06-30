import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";

export async function uploadProductImage(file) {
  if (!file) return "";

  const fileName = `${Date.now()}-${file.name}`;

  const storageRef = ref(storage, `products/${fileName}`);

  await uploadBytes(storageRef, file);

  return await getDownloadURL(storageRef);
}