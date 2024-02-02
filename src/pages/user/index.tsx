"use client";

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

import { User } from "@/types/user-type";
import apiClient from "@/core/apiClient";
import useSWR from "swr";

//import { getAllUsers } from "./route";



export async function getAllUsers() {
    let users = await apiClient
      .get(`/api/users`,{})
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
        return undefined;
      });
    console.log("user response ", users);
    return users;
  }

export default function UserList() {
  const {data: users, error, isLoading} = useSWR<User[]>("/users", getAllUsers, {
    revalidateOnFocus: false
  });
  if (error) return <div>Error!!!;</div>;
  if (isLoading) return <div>Loading ....!!;</div>;
 // console.log("data =>", users);
  return (
  <div>
{users && <Table isStriped>
        <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Action</TableColumn>

        </TableHeader>
        <TableBody>
            {users.map((user) => (
                <TableRow key={user.Email}>
                    <TableCell>{user.Email}</TableCell>
                    <TableCell>Edit | Delete</TableCell>
                </TableRow>
            ))}

        </TableBody>
    </Table>}
  </div>
  );
}
