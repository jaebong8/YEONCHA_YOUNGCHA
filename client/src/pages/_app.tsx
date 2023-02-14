import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ChakraProvider } from "@chakra-ui/react";
import { createContext, useEffect, useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyDoZkDQsu71m13V6OB9Yob9MADnW-E_5Q0",
    authDomain: "yeoncha-youngcha.firebaseapp.com",
    projectId: "yeoncha-youngcha",
    storageBucket: "yeoncha-youngcha.appspot.com",
    messagingSenderId: "96197425489",
    appId: "1:96197425489:web:edf61e80c24dd30a993b70",
    measurementId: "G-2BJJBXW8ZW",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

interface userInfo {
    email: string;
    userUid: string;
    role: string;
}

export const GlobalContext = createContext<userInfo>({});

export default function App({ Component, pageProps }: AppProps) {
    const [user, setUser] = useState({});
    useEffect(() => {
        const loadingUser = async () => {
            const userUid = sessionStorage?.getItem("signIn");
            if (userUid !== null) {
                const userRef = doc(db, "users", userUid);
                const workersRef = doc(db, "workers", userUid);
                const userSnap = await getDoc(userRef);
                const workersSnap = await getDoc(workersRef);

                if (userSnap.exists()) {
                    setUser(userSnap.data());
                    console.log("Document data:", userSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }

                if (workersSnap.exists()) {
                    setUser((prev) => {
                        const newState = { ...prev };
                        newState["workers"] = workersSnap.data();
                        return newState;
                    });
                    console.log("Document data:", workersSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }
        };
        loadingUser();
    }, []);
    return (
        <GlobalContext.Provider value={user}>
            <ChakraProvider>
                <Component {...pageProps} />
            </ChakraProvider>
        </GlobalContext.Provider>
    );
}
