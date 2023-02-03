import LoginButton from "@/components/loginButton/LoginButton";
import LoginImage from "@/components/loginImage/LoginImage";
import LoginInput from "@/components/loginInput/LoginInput";
import LoginLink from "@/components/loginLink/LoginLink";
import styles from "@/pages/login/login.module.scss";
import { useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const auth = getAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                router.push("/");
            } else {
                console.log("logout");
                setLoading(false);
            }
        });
    }, []);
    const onSubmitHandler = useCallback(
        (e: React.FormEvent<HTMLElement>) => {
            e.preventDefault();

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    setEmail("");
                    setPassword("");
                    router.push("/");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    if (errorCode === "auth/user-not-found") {
                        setErrorMsg("아이디가 존재하지 않습니다.");
                    }
                    if (errorCode === "auth/wrong-password") {
                        setErrorMsg("잘못된 비밀번호 입니다.");
                    }
                });
        },
        [email, password, auth, router]
    );

    return (
        <>
            {!loading && (
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
export default Login;
