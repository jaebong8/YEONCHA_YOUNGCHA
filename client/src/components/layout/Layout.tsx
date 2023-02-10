import { format } from "date-fns";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import styles from "./Layout.module.scss";

interface ObjType {
    [key: string]: string[];
}

const pathNames: ObjType = {
    home: ["/home", "연차 사용 현황"],
    employee: ["/management/employee", "직원 관리"],
    annual: ["/management/annual", "연차 관리"],
    document: ["/management/document", "문서 관리"],
};

const Layout = (props: { children: React.ReactNode }) => {
    const router = useRouter();
    const auth = getAuth();
    const onLogout = useCallback(() => {
        signOut(auth);
        sessionStorage.removeItem("signIn");
    }, []);
    const pathName = router.pathname;
    const lastPath = pathName.split("/")[pathName.split("/").length - 1];

    return (
        <div className={styles.container}>
            <nav>
                <div>
                    <Image src={"/images/longIcon.png"} width={150} height={80} alt="longIcon" priority />
                </div>
                <ul>
                    {Object.values(pathNames).map((list, i) => {
                        return (
                            <li key={`list${i}`} className={pathName === list[0] ? styles.active : ""}>
                                <Link href={list[0]}>{list[1]}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <main>
                <div className={styles.topBar}>
                    <div className={styles.left}>
                        <div className={styles.fullyearTitle}>{format(new Date(), "yyyy년 MM월 dd일")}</div>
                    </div>
                    <h2>{pathNames[lastPath][1]}</h2>
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
