import LoginButton from "@/components/loginButton/LoginButton";
import LoginImage from "@/components/loginImage/LoginImage";
import LoginInput from "@/components/loginInput/LoginInput";
import LoginLink from "@/components/loginLink/LoginLink";
import styles from "@/pages/login/login.module.scss";
import { useCallback, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [onSuccess, setOnSuccess] = useState(false);

    const auth = getAuth();
    const onSubmitHandler = useCallback(
        (e: React.FormEvent<HTMLElement>) => {
            e.preventDefault();
            if (password !== passwordCheck) {
                setErrorMsg("패스워드가 일치하지 않습니다.");
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setEmail("");
                    setPassword("");
                    setPasswordCheck("");
                    setErrorMsg("");
                    setOnSuccess(true);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    if (errorCode === "auth/invalid-email") {
                        setErrorMsg("잘못된 이메일 형식입니다.");
                    }
                    if (errorCode === "auth/email-already-in-use") {
                        setErrorMsg("이미 가입된 이메일입니다.");
                    }

                    console.log("errorCode", errorCode);
                    console.log("errorMessage", errorMessage);
                });
        },
        [email, password, auth, passwordCheck]
    );

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <div>
                    <LoginImage />
                    <LoginInput
                        placeholder="이메일을 입력해주세요."
                        value={email}
                        setValue={setEmail}
                        type="email"
                    />
                    <LoginInput
                        placeholder="비밀번호를 6자리 이상 입력해주세요."
                        value={password}
                        setValue={setPassword}
                        type="password"
                    />
                    <LoginInput
                        placeholder="비밀번호를 다시 입력해주세요."
                        value={passwordCheck}
                        setValue={setPasswordCheck}
                        type="password"
                    />
                    {errorMsg && (
                        <span className={styles.errorMsg}>{errorMsg}</span>
                    )}
                    <LoginButton />
                    <LoginLink />
                    {/* <OnSuccess /> */}
                </div>
            </form>
        </div>
    );
};

export default Register;

const OnSuccess = () => {
    return <div>회원가입이 완료되었습니다.</div>;
};
