import styles from "./LoginInput.module.scss";

interface Props {
    placeholder: string;
}

const LoginInput: React.FC<Props> = ({ placeholder }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            required
            className={styles.loginInput}
        />
    );
};

export default LoginInput;
