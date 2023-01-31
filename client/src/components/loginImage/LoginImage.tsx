import Image from "next/image";
import { memo } from "react";
import styles from "./LoginImage.module.scss";

const LoginImage = () => {
    return (
        <Image
            className={styles.mainIcon}
            src={"/images/mainIcon.png"}
            width={150}
            height={150}
            alt="mainIcon"
            priority
        />
    );
};

export default memo(LoginImage);
