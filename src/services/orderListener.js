import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export function listenOrders(callback) {
  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((order) => order.closed !== true);

    callback(orders);
  });
}