import { useRouter } from "next/router";
import styles from "./LoginButton.module.scss";

const LoginButton = () => {
    const router = useRouter();
    const routeName = router.route;
    return (
        <button className={styles.loginButton}>
            {routeName === "/login" ? "로그인" : "회원가입"}
        </button>
    );
};

export default LoginButton;
