export interface User {
    ID: number;
    Email: string;
    RoleID: number;
    Role: Role;
    UserGroupID: number;
    UserGroup: UserGroup;
    Deleted: boolean;
  }
  
  export interface Role {
    ID: number;
    Name: string;
    Users: User[];
    Permissions: RolePermission[];
  }
  
  export interface UserGroup {
    ID: number;
    Name: string;
    Users: User[];
  }
  
  export interface RolePermission {
    RoleID: number;
    Permission: string;
    Role: Role;
  }
  