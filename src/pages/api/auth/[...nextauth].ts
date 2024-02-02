import AzureAD from "next-auth/providers/azure-ad";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import { getPermissions } from "../userProfile-api";
import { jwtDecode } from "jwt-decode";

async function refreshIdToken(idToken: JWT): Promise<JWT> {
    try{
        const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;
        const req = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: 
            `grant_type=refresh_token` +
            `&client_secret=${process.env.AZURE_AD_CLIENT_SECRET}` +
            `&refresh_token=${idToken.refreshToken}` +
            `&client_id=${process.env.AZURE_AD_CLIENT_ID}`
        });
        const res = await req.json();
        const decodedIdToken = jwtDecode(res.id_token);
        return{
            ...idToken,
            idToken: res.id_token,
            idTokenExpires: decodedIdToken.exp!,
            refreshToken: res.refresh_token ?? idToken.refreshToken
        };
    }catch(error){
        console.log(error);
        return {
            ...idToken,
            error: "RefreshIdTokenError"
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        AzureAD({
            clientId: process.env.AZURE_AD_CLIENT_ID!,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
            tenantId: process.env.AZURE_AD_TENANT_ID,
            authorization: {
                params: {
                    scope: 'openid email profile offline_access'
                }
            }
        }),
    ],
    callbacks: {
        async jwt({token, account}): Promise<JWT> {
            if(account){
                const idToken = account.id_token!;
                try{
                    const header = {
                        Authorization: `Bearer ${account.id_token}`,
                    };
                    const response = await getPermissions("/userProfile/", header)
                    let permissions = Object.assign(
                        {},
                        ...response!.data.Permissions.map((x) => ({[x.Resource]: x.Actions}))
                    );
                    token.rolePermissions = permissions;
                } catch(error){
                    console.log("error", error)
                }
                const decodedIdToken = jwtDecode(idToken)
                token.idToken = account.id_token!;
                token.idTokenExpires = decodedIdToken.exp!;
                token.refreshToken = account.refresh_token!;
            }
            if (Date.now() / 1000 < token.idTokenExpires) {
                return token;
              }
        
              return refreshIdToken(token);
        },
        async session({session, token}) {
            session.user.rolePermission = token.rolePermissions;
            return session;
          }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}

export default NextAuth(authOptions)