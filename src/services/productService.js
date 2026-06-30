import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const productsCollection = collection(db, "products");

export async function getProducts() {
  const q = query(
    productsCollection,
    orderBy("sortOrder", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function getAvailableProducts() {
  const products = await getProducts();

  return products.filter((product) => product.available);
}

export async function createProduct(product) {
  return await addDoc(productsCollection, {
    name: product.name,
    description: product.description || "",
    image: product.image || "",
    category: product.category,
    price: Number(product.price),
    available: product.available ?? true,
    featured: product.featured ?? false,
    sortOrder: product.sortOrder ?? Date.now(),
  });
}

export async function updateProduct(id, data) {
  await updateDoc(doc(db, "products", id), {
    ...data,
    price: Number(data.price),
  });
}

export async function toggleAvailability(id, available) {
  await updateDoc(doc(db, "products", id), {
    available,
  });
}

export async function toggleFeatured(id, featured) {
  await updateDoc(doc(db, "products", id), {
    featured,
  });
}

export async function deleteProduct(id) {
  await deleteDoc(doc(db, "products", id));
}