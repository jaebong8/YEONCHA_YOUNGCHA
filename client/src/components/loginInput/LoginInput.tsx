import styles from "./LoginInput.module.scss";

interface Props {
    placeholder: string;
    value: string;
    setValue: (str: string) => void;
    type: string;
}

const LoginInput: React.FC<Props> = ({
    placeholder,
    value,
    setValue,
    type,
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            required
            className={styles.loginInput}
            onChange={(e) => setValue(e.target.value)}
            value={value}
            minLength={6}
        />
    );
};

export default LoginInput;
