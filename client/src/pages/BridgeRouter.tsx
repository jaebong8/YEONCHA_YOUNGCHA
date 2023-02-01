import { useRouter } from "next/router";
import React, { useEffect } from "react";

const BridgeRouter = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/login");
    }, [router]);

    return <></>;
};

export default BridgeRouter;
