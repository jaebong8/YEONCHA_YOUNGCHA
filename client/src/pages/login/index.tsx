import LoginButton from "@/components/loginButton/LoginButton";
import LoginImage from "@/components/loginImage/LoginImage";
import LoginInput from "@/components/loginInput/LoginInput";
import LoginLink from "@/components/loginLink/LoginLink";
import styles from "@/pages/login/login.module.scss";
import { useCallback, useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitHandler = useCallback(
        (e: React.FormEvent<HTMLElement>) => {
            e.preventDefault();
            console.log(email, password);
        },
        [email, password]
    );

    return (
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
                    <LoginButton />
                    <LoginLink />
                </div>
            </form>
        </div>
    );
};
export default Login;
