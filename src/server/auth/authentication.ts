import { GetServerSidePropsContext, NextApiRequest } from "next";
import nookies from "nookies";
import { User } from "../../types/User";
import { log } from "../utils/log";
import { firebaseAdmin } from "../firbaseAdmin";
import { usersRepository } from "../repository/UserRepository";

export const onlyAuthenticateUsers = async (ctx: GetServerSidePropsContext) => {
    const user = await getUserFromPropsContext(ctx);
    if (user) {
        return {
            props: {
                user,
            },
        };
    }
    return {
        redirect: {
            permanent: false,
            destination: "/login",
        },
        props: {} as never,
    };
};

export async function getUserFromPropsContext(
    ctx: GetServerSidePropsContext
): Promise<User | undefined> {
    const cookies = nookies.get(ctx);
    return getUserInfoFromToken(cookies.token);
}

export function getUserInfoFromRequest(
    req: NextApiRequest
): Promise<User | undefined> {
    const cookies = nookies.get({ req });
    return getUserInfoFromToken(cookies.token);
}

export async function getUserInfoFromToken(
    token: string
): Promise<User | undefined> {
    let result: User | undefined = undefined;
    const auth = firebaseAdmin.auth();
    try {
        const verifiedToken = await auth.verifyIdToken(token);
        const user = await auth.getUser(verifiedToken.uid);
        result = await usersRepository.getOrCreateUserInfo(user);
    } catch (error) {
        log('Error verifying token', 'warning');
    };

    return result;
}