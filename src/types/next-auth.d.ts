import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            rolePermission: string | unknown;
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt"{
    interface JWT extends DefaultJWT{
        idToken: string;
        idTokenExpires: number;
        refreshToken: string;
    }
}