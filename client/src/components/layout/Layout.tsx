import { format } from "date-fns";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import styles from "./Layout.module.scss";

const pathNames = {
    employee: "/management/employee",
    annual: "/management/annual",
    document: "/management/document",
};

const Layout = (props: { children: React.ReactNode }) => {
    const router = useRouter();
    const auth = getAuth();
    const onLogout = useCallback(() => {
        signOut(auth);
        sessionStorage.removeItem("signIn");
    }, []);
    const pathName = router.pathname;
    const isActive = Object.values(pathNames).includes(pathName);

    return (
        <div className={styles.container}>
            <nav>
                <div>
                    <Image src={"/images/longIcon.png"} width={150} height={80} alt="longIcon" priority />
                </div>
                <ul>
                    <li className={isActive ? styles.active : ""}>
                        <Link href={"/management/employee"}>직원 관리</Link>
                    </li>
                    <li>
                        <Link href={"/management/annual"}>연차 관리</Link>
                    </li>
                    <li>
                        <Link href={"/management/document"}>문서 관리</Link>
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
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
