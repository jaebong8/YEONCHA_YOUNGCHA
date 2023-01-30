import styles from "./LoginLink.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const LoginLink = () => {
    const router = useRouter();
    const routeName = router.route;
    return (
        <div className={styles.loginLink}>
            <span>
                {routeName === "/login"
                    ? "아이디가 없으신가요?"
                    : "아이디가 이미 있으신가요?"}
            </span>
            <Link href={routeName === "/login" ? "/register" : "/login"}>
                {routeName === "/login" ? "회원가입" : "로그인"}
            </Link>
        </div>
    );
};

export default LoginLink;
