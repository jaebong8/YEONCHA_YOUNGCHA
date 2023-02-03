import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import styles from "../styles/home.module.scss";
import Image from "next/image";

const Home: React.FC = () => {
    const auth = getAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setLoading(false);
            } else {
                console.log("logout");
                router.push("/login");
            }
        });
    }, []);
    const onLogout = useCallback(() => {
        signOut(auth);
    }, []);

    return (
        <>
            <Head>
                <title>연차영차</title>
                <meta name="description" content="YEONCHA YOUNGCHA" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {!loading && (
                <>
                    <div className={styles.container}>
                        <nav>
                            <div>
                                <Image src={"/images/longIcon.png"} width={150} height={80} alt="longIcon" />
                            </div>
                            <ul>
                                <li>직원 관리</li>
                                <li>연차 관리</li>
                                <li>문서 관리</li>
                            </ul>
                        </nav>
                        <main>
                            <div className={styles.topBar}>
                                <div className={styles.left}></div>
                                <h2>연차 사용 현황</h2>
                                <div className={styles.avatar}>
                                    {" "}
                                    <button onClick={onLogout}>로그아웃</button>
                                </div>
                            </div>
                        </main>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
