import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function sendOrder(order) {
  try {
    await addDoc(collection(db, "orders"), {
      ...order,
      status: "new",
      createdAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}