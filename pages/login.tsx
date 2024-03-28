import { ConnectEmbed, useUser } from "@thirdweb-dev/react";
import { getUser } from "./api/auth/[...thirdweb]";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const Login = () => {
    const { isLoggedIn, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isLoggedIn) {
            router.push("/");
        }
    }, [isLoggedIn, isLoading]);

    return (
        <div>
            <h1>Login</h1>
            <ConnectEmbed
                auth={{
                    loginOptional: false,
                }}
            />
        </div>
    )
};

export default Login;

export async function getServerSideProps(context: any) {
    const user = await getUser(context.req);

    if(user) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}