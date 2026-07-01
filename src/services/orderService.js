import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function sendOrder(order) {
  try {
    console.log("ORDINE DA SALVARE:", order);

    const docRef = await addDoc(
      collection(db, "orders"),
      {
        ...order,
        status: "new",
        createdAt: serverTimestamp(),
      }
    );

    console.log("SALVATO CON ID:", docRef.id);

    return {
      success: true,
      orderId: docRef.id,
    };
  } catch (error) {
    console.error("ERRORE FIREBASE:", error);

    return {
      success: false,
      orderId: null,
    };
  }
}