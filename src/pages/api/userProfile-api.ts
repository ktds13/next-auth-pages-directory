import {AxiosResponse} from "axios";
import { SERVER_API_URL } from "../../../appsettings";
import { UserProfile } from "@/types/userProfile-type";
import apiClient from "@/core/apiClient";

export async function getPermissions(
  path: string,
  headers: object
): Promise<AxiosResponse<UserProfile> | undefined> {
  console.log("path", SERVER_API_URL + `/api${path}`);
  let permissions = await apiClient
    .get(SERVER_API_URL + `/api${path}`, headers)
    .then((res) => res)
    .catch((err) => {
      console.log(err);
      return undefined;
    });
  return permissions;
}
