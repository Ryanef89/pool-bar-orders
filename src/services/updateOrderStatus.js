import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function updateOrderStatus(id, status) {
  try {
    await updateDoc(doc(db, "orders", id), {
      status,
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}