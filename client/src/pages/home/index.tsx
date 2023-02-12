import { useCallback, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import styles from "./home.module.scss";

import Calendar from "@/components/calendar/Calendar";

import Spinner from "@/components/spinner/Spinner";
import Layout from "@/components/layout/Layout";

const HomePage: React.FC = () => {
    const auth = getAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            const isLogIn = user?.uid === sessionStorage.getItem("signIn");

            if (!isLogIn) {
                setLoading(true);
                router.push("/auth/signin",undefined, {shallow: true});
            } else if (isLogIn) {
                setLoading(false);
            }
        });
    }, []);
    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Layout>
                        <Calendar />
                    </Layout>
                </>
            )}
        </>
    );
};

export default HomePage;
