import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import styles from "../styles/home.module.scss";
import Image from "next/image";

import Calendar from "@/components/calendar/Calendar";
import { format } from "date-fns";
import withAuth from "@/hoc/withAuth";

const Home: React.FC = () => {
    const auth = getAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user?.metadata.creationTime !== user?.metadata.lastSignInTime) {
    //             setLoading(false);
    //         } else {
    //             console.log("logout");
    //             router.push("/login");
    //         }
    //     });
    // }, []);

    const onLogout = useCallback(() => {
        signOut(auth);
        sessionStorage.removeItem("signIn");
    }, []);

    return (
        <>
            <Head>
                <title>연차영차</title>
                <meta name="description" content="YEONCHA YOUNGCHA" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
                            <div className={styles.left}>
                                <div className={styles.fullyearTitle}>{format(new Date(), "yyyy년 MM월 dd일")}</div>
                            </div>
                            <h2>연차 사용 현황</h2>
                            <div className={styles.avatar}>
                                <button onClick={onLogout}>로그아웃</button>
                            </div>
                        </div>
                        <section className={styles.calendarContainer}>
                            <Calendar />
                        </section>
                    </main>
                </div>
            </>
        </>
    );
};

export default withAuth(Home);
