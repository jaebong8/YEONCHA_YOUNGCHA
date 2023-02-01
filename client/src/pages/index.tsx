import Head from "next/head";
import { useCallback, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import BridgeRouter from "./BridgeRouter";

function Home() {
    const auth = getAuth();
    const router = useRouter();
    const onClickHandler = useCallback(() => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                router.push("/login");
            })
            .catch((error) => {
                // An error happened.
            });
    }, [auth, router]);

    if (auth.currentUser === null) {
        return <BridgeRouter />;
    }

    return (
        <>
            <Head>
                <title>연차영차</title>
                <meta name="description" content="YEONCHA YOUNGCHA" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1>인덱스 페이지</h1>
                <button onClick={onClickHandler}>로그아웃</button>
            </div>
        </>
    );
}

export default Home;
