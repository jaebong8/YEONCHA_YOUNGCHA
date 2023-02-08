import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

function withAuth(Component: ComponentType) {
    return () => {
        const auth = getAuth();
        const router = useRouter();
        const pathName = router.pathname;
        const [loading, setLoading] = useState(true);
        useEffect(() => {
            console.log("withAuth");
            onAuthStateChanged(auth, (user) => {
                const isLogIn = user?.uid === sessionStorage.getItem("signIn");
                if (!isLogIn && pathName === "/") {
                    router.push("/login");
                }
                if (isLogIn && pathName === "/login") {
                    router.push("/");
                }
                setLoading(false);
            });
        }, []);

        return <Component />;
    };
}

export default withAuth;
