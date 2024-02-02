export type UserProfile = {
    UserID: number;
    UserName: string;
    UserRoleID: number;
    UserRoleName: string;
    UserGroupID: number;
    UserGroupName: string;
    IsDeleted: boolean;
    Permissions: Permission[];
  };
  
  type Permission = {
    Resource: string;
    Actions: string[];
  };
  