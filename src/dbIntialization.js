import { getDatabase, ref, set } from "firebase/database";

export const initializePageConfig = () => {
  console.log("here");
  const database = getDatabase();
  const pageRef = ref(database, "page");

  set(pageRef, {
    aboutMe: 2,
    address: 2,
    birthdate: 3,
  })
    .then(() => {
      console.log("Page configuration saved to Firebase.");
    })
    .catch((error) => {
      console.error("Error saving page configuration:", error);
    });
}