import { doc, getDoc } from "firebase/firestore";
import { db } from "./../data/firebase";
const environmentId: string = "6FxypAxo4NTIVW3e80d4";
const fetchEnvironmentVariables = async () => {
    try {
        const docRef: any = doc(db, "environment", environmentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Document not found");
        }
    } catch (err: any) {
        return err.message;
    }
}
export { fetchEnvironmentVariables }