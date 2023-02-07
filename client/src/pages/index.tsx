import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import styles from "../styles/home.module.scss";
import Image from "next/image";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    differenceInCalendarDays,
    getMonth,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
    const auth = getAuth();
    const router = useRouter();
    const [today, setToday] = useState(new Date());
    const [loading, setLoading] = useState(true);
    const weekMock = ["일", "월", "화", "수", "목", "금", "토"];
    const monthStart = startOfMonth(today);
    const monthEnd = endOfMonth(today);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const createMonth = useMemo(() => {
        const monthArray = [];
        let day = startDate;
        while (differenceInCalendarDays(endDate, day) >= 0) {
            monthArray.push(day);
            day = addDays(day, 1);
        }
        return monthArray;
    }, [today]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log("logout");
                router.push("/login");
            }
        });
    }, []);
    useEffect(() => {
        console.log(createMonth);
    }, [today]);

    const onLogout = useCallback(() => {
        signOut(auth);
    }, []);

    const nextMonthHandler = useCallback(() => {
        setToday(addMonths(today, 1));
    }, [today]);
    const prevMonthHandler = useCallback(() => {
        setToday(subMonths(today, 1));
    }, [today]);

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
                                <div className={styles.left}>
                                    <div className={styles.fullyearTitle}>{format(new Date(), "yyyy년 MM월 dd일")}</div>
                                </div>
                                <h2>연차 사용 현황</h2>
                                <div className={styles.avatar}>
                                    <button onClick={onLogout}>로그아웃</button>
                                </div>
                            </div>
                            <section className={styles.calendarContainer}>
                                <div className={styles.calendar}>
                                    <div className={styles.yearTitle}>{format(today, "yyyy년")}</div>
                                    <div className={styles.monthTitle}>
                                        <button className={styles.prevButton} onClick={prevMonthHandler}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </button>
                                        <div className={styles.month}>{format(today, "M월")}</div>
                                        <button className={styles.nextButton} onClick={nextMonthHandler}>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </button>
                                    </div>
                                    <div className={styles.dayContainer}>
                                        {weekMock.map((v, i) => {
                                            return <div key={`day${i}`}>{v}</div>;
                                        })}
                                    </div>
                                    <div className={styles.dateContainer}>
                                        {createMonth.map((v, i) => {
                                            let validation;
                                            validation = getMonth(today) === getMonth(v);
                                            return (
                                                <div
                                                    key={`date${i}`}
                                                    className={validation ? styles.currentMonth : styles.diffMonth}
                                                >
                                                    <span>{format(v, "d")}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </section>
                        </main>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
