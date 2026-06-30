import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function sendOrder(order) {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      status: "new",
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      orderId: docRef.id,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      orderId: null,
    };
  }
}