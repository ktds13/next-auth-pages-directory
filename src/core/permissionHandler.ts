import {useSession} from "next-auth/react";

export const useProfile = () => {
  const {data: session} = useSession();
  if (session) {
    console.log("user email: ", session);
    return session.user;
  }
  return null;
};

export const usePermissions = () => {
  const user = useProfile();
  if (user) return user.rolePermission as string;
  return [];
};

export const useResource = (requireResource: any) => {
  const claimPermissions = usePermissions();
  return claimPermissions[requireResource];
};

export const HasResourcePermission = (requireResource: any) => {
  const resource = useResource(requireResource);
  if (resource) return true;
};

export const HasActionPermission = (requireResource: any, requireAction: any) => {
  const actions = useResource(requireResource);
  if (actions) return actions.includes(requireAction);
};
