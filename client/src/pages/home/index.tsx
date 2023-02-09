import { useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import styles from "./home.module.scss";
import Image from "next/image";

import Calendar from "@/components/calendar/Calendar";
import { format } from "date-fns";
import { el } from "date-fns/locale";
import Spinner from "@/components/spinner/Spinner";

const HomePage: React.FC = () => {
    const auth = getAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const onLogout = useCallback(() => {
        signOut(auth);
        sessionStorage.removeItem("signIn");
    }, []);

    const listClick = useCallback((url: string) => {
        router.push(url);
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const isLogIn = user?.uid === sessionStorage.getItem("signIn");

            if (!isLogIn) {
                setLoading(true);
                router.push("/auth/signin");
            } else if (isLogIn) {
                setLoading(false);
            }
        });
    }, []);
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className={styles.container}>
                    <nav>
                        <div>
                            <Image src={"/images/longIcon.png"} width={150} height={80} alt="longIcon" priority />
                        </div>
                        <ul>
                            <li
                                onClick={() => {
                                    listClick("/management/employee");
                                }}
                            >
                                직원 관리
                            </li>
                            <li
                                onClick={() => {
                                    listClick("/management/annual");
                                }}
                            >
                                연차 관리
                            </li>
                            <li
                                onClick={() => {
                                    listClick("/management/document");
                                }}
                            >
                                문서 관리
                            </li>
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
            )}
        </>
    );
};

export default HomePage;
