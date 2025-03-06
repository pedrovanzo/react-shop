import { collection, query, getDocs } from "firebase/firestore";
import { db } from "./../../data/firebase";
const fetchData = async () => {
  try {
    const dbQuery: any = query(collection(db, "products"));
    const querySnapshot = await getDocs(dbQuery)
    if (querySnapshot !== null) {
        const allDocs = querySnapshot.docs
        return allDocs
    } else {
      console.log("Document not found!");
    }
  } catch (err: any) {
    return err.message;
  }
};
export { fetchData };
