import LoginButton from "@/components/loginButton/LoginButton";
import LoginImage from "@/components/loginImage/LoginImage";
import LoginInput from "@/components/loginInput/LoginInput";
import LoginLink from "@/components/loginLink/LoginLink";
import styles from "@/pages/login/login.module.scss";
import { useCallback, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import withAuth from "@/hoc/withAuth";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [onSuccess, setOnSuccess] = useState(false);
    const [userName, setUserName] = useState<string | null>("");
    const auth = getAuth();
    const db = getFirestore();
    const onSubmitHandler = useCallback(
        async (e: React.FormEvent<HTMLElement>) => {
            e.preventDefault();
            if (password !== passwordCheck) {
                setErrorMsg("패스워드가 일치하지 않습니다.");
                return;
            }
            try {
                const user = await createUserWithEmailAndPassword(auth, email, password);
                const uid = user.user.uid;
                const docRef = await addDoc(collection(db, "users"), {
                    userUid: uid,
                });
                setUserName(user.user.email);
                setEmail("");
                setPassword("");
                setPasswordCheck("");
                setErrorMsg("");
                setOnSuccess(true);
            } catch (error: any) {
                console.dir(error);
                const errorCode = error.code;
                if (errorCode === "auth/invalid-email") {
                    setErrorMsg("잘못된 이메일 형식입니다.");
                }
                if (errorCode === "auth/email-already-in-use") {
                    setErrorMsg("이미 가입된 이메일입니다.");
                }
            }
        },
        [email, password, auth, passwordCheck]
    );

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmitHandler}>
                <div>
                    {onSuccess ? (
                        <OnSuccess userName={userName} />
                    ) : (
                        <>
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
                            {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
                            <LoginButton />
                            <LoginLink />
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default withAuth(Register);

interface Props {
    userName: string | null;
}

const OnSuccess: React.FC<Props> = ({ userName }) => {
    const router = useRouter();
    const onClickHandler = useCallback(() => {
        router.push("/login");
    }, [router]);

    return (
        <div className={styles.onSuccess}>
            <Image src={"/images/check.png"} alt="checkRegister" width={100} height={100} />
            <p className={styles.userName}>{userName}님,</p>
            <p>회원가입을 환영합니다.</p>
            <button onClick={onClickHandler}>로그인하기</button>
        </div>
    );
};
