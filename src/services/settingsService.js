import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const ref = doc(db, "settings", "general");

const defaults = {
  resortName: "Toscana Sport Resort",
  barName: "Pool Bar",
  ombrelloni: 40,
  qrLayout: 12,
  primaryColor: "#0b8457",
};

export async function getSettings() {
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, defaults);
    return defaults;
  }

  return snap.data();
}

export async function saveSettings(data) {
  await updateDoc(ref, data);
}