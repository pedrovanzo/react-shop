import { doc, getDoc } from "firebase/firestore";
import { db } from "./../../data/firebase";
const fetchData = async (docParam: { id: string }) => {
  try {
    const docRef: any = doc(db, "products", docParam.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Document not found");
    }
  } catch (err: any) {
    return err.message;
  }
};
export { fetchData };
