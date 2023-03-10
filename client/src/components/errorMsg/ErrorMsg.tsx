import styles from "./ErrorMsg.module.scss";

const ErrorMsg = (props: { children: String | boolean }) => {
    return <p className={styles.errorMsg}>{props.children}</p>;
};

export default ErrorMsg;
