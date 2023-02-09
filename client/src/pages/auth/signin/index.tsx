import LoginButton from "@/components/loginButton/LoginButton";
import LoginImage from "@/components/loginImage/LoginImage";
import LoginInput from "@/components/loginInput/LoginInput";
import LoginLink from "@/components/loginLink/LoginLink";
import styles from "@/pages/auth/signin/signIn.module.scss";
import { useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner/Spinner";

const SignIn: React.FC = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const onSubmitHandler = useCallback(
        async (e: React.FormEvent<HTMLElement>) => {
            e.preventDefault();
            try {
                const user = await signInWithEmailAndPassword(auth, email, password);
                console.log(user.user.uid);
                sessionStorage.setItem("signIn", user.user.uid);
                setEmail("");
                setPassword("");
                router.push("/home");
            } catch (error: any) {
                const errorCode = error.code;
                console.log(errorCode);
                if (errorCode === "auth/user-not-found") {
                    setErrorMsg("아이디가 존재하지 않습니다.");
                }
                if (errorCode === "auth/wrong-password") {
                    setErrorMsg("잘못된 비밀번호 입니다.");
                }
            }
        },
        [email, password, auth, router]
    );

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const isLogIn = user?.uid === sessionStorage.getItem("signIn");

            if (isLogIn) {
                router.push("/home");
                setLoading(true);
            } else if (!isLogIn) {
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
                    <form className={styles.form} onSubmit={onSubmitHandler}>
                        <div>
                            <LoginImage />
                            <LoginInput
                                placeholder="아이디를 입력해주세요."
                                value={email}
                                setValue={setEmail}
                                type="email"
                            />
                            <LoginInput
                                placeholder="비밀번호를 입력해주세요."
                                value={password}
                                setValue={setPassword}
                                type="password"
                            />
                            {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
                            <LoginButton />
                            <LoginLink />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
export default SignIn;
