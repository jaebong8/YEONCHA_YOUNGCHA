import { useRouter } from "next/router";
import { memo } from "react";
import styles from "./LoginButton.module.scss";

const LoginButton = () => {
    const router = useRouter();
    const routeName = router.route;
    return <button className={styles.loginButton}>{routeName === "/auth/signin" ? "로그인" : "회원가입"}</button>;
};

export default memo(LoginButton);
