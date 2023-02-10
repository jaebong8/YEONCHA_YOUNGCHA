import LoginButton from "@/components/loginButton/LoginButton";
import LoginImage from "@/components/loginImage/LoginImage";
import LoginInput from "@/components/loginInput/LoginInput";
import LoginLink from "@/components/loginLink/LoginLink";
import styles from "@/pages/auth/signin/signIn.module.scss";
import { useCallback, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { collection, addDoc, getFirestore, setDoc, doc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [userName, setUserName] = useState<string | null>("");
    const auth = getAuth();
    const db = getFirestore();
    const toast = useToast();
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
                const docRef = await setDoc(doc(db, "users", uid), {
                    userUid: uid,
                    role: "admin",
                    email: email,
                });
                setUserName(user.user.email);
                setEmail("");
                setPassword("");
                setPasswordCheck("");
                setErrorMsg("");
                sessionStorage.removeItem("signIn");
                toast({
                    title: "회원가입이 완료되었습니다.",
                    description: "이메일과 비밀번호로 로그인해주세요.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
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
                </div>
            </form>
        </div>
    );
};

export default SignUp;

// interface Props {
//     userName: string | null;
// }

// const OnSuccess: React.FC<Props> = ({ userName }) => {
//     const router = useRouter();
//     const onClickHandler = useCallback(
//         (e: React.FormEvent<HTMLElement>) => {
//             e.preventDefault();
//             router.push("/auth/signin");
//         },
//         [router]
//     );

//     return (
//         <div className={styles.successContainer}>
//             <div className={styles.onSuccess}>
//                 <Image src={"/images/check.png"} alt="checkRegister" width={100} height={100} />
//                 <p className={styles.userName}>{userName}님,</p>
//                 <p>회원가입을 환영합니다.</p>
//                 <button onClick={onClickHandler}>로그인하기</button>
//             </div>
//         </div>
//     );
// };
