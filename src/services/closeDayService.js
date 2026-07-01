import {
  collection,
  getDocs,
  writeBatch,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function closeDay() {
  const snapshot = await getDocs(collection(db, "orders"));

  const batch = writeBatch(db);

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (
      data.status === "Archiviato" &&
      !data.closed
    ) {
      batch.update(doc.ref, {
        closed: true,
      });
    }
  });

  await batch.commit();
}