import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useLayoutEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
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

    return <Component {...pageProps} />;
}
