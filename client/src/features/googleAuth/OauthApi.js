// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { app } from "../../firebase";

// export function googleAuth() {
//   return new Promise(async (resolve) => {
//     const provider = new GoogleAuthProvider();
//     const auth = getAuth(app);
//     const result = await signInWithPopup(auth, provider);
//     const response = await fetch("/api/v1/google", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify({
//         name: result.user.displayName,
//         email: result.user.email,
//         photo: result.user.photoURL,
//       }),
//     });
//     const data = response.json();
//     resolve({ data });
//   });
// }
