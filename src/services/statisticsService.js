import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getStatistics() {
  const snapshot = await getDocs(collection(db, "orders"));

  const orders = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  let revenue = 0;
  let totalOrders = orders.length;

  const productCounter = {};
  const umbrellaCounter = {};

  orders.forEach((order) => {
    revenue += Number(order.total || 0);

    umbrellaCounter[order.ombrellone] =
      (umbrellaCounter[order.ombrellone] || 0) + 1;

    (order.items || []).forEach((item) => {
      productCounter[item.name] =
        (productCounter[item.name] || 0) + item.quantity;
    });
  });

  const average =
    totalOrders > 0
      ? revenue / totalOrders
      : 0;

  const topUmbrella =
    Object.entries(umbrellaCounter).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "-";

  const topProduct =
    Object.entries(productCounter).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || "-";

  return {
    revenue,
    totalOrders,
    average,
    topUmbrella,
    topProduct,
  };
}