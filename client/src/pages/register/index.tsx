import LoginButton from "@/components/loginButton/LoginButton";
import LoginInput from "@/components/loginInput/LoginInput";
import LoginLink from "@/components/loginLink/LoginLink";
import styles from "@/pages/login/login.module.scss";
import Image from "next/image";
import mainIcon from "../../../public/images/mainIcon.png";
const Register = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div>
                    <Image
                        className={styles.mainIcon}
                        src={mainIcon}
                        width={150}
                        height={150}
                        alt="mainIcon"
                    />
                    <LoginInput placeholder="아이디를 입력해주세요." />
                    <LoginInput placeholder="비밀번호를 입력해주세요." />
                    <LoginButton />
                    <LoginLink />
                </div>
            </form>
        </div>
    );
};

export default Register;
