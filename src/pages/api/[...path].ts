import { NextApiRequest, NextApiResponse } from "next";

import { SERVER_API_URL } from "../../../appsettings";
import apiClient from "@/core/apiClient";
import { getToken } from "next-auth/jwt";
import { isEmptyObject } from "@/core/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const token = await getToken({req});
    if (!token) {
        res.status(401).json({error: "Unauthorized"});
        return;
      }
      const header = {
        Authorization: `Bearer ${token.idToken}`
      };
      try {
        let apiResponse = null;
        const {method, body, query} = req;
        const externalApiUrl = buildExternalApiUrl(query);
        switch (method) {
          case "GET":
            apiResponse = await apiClient.get(externalApiUrl, header);
            break;
          case "POST":
            apiResponse = await apiClient.post(externalApiUrl, body, header);
            break;
          case "PUT":
            apiResponse = await apiClient.put(externalApiUrl, body, header);
            break;
          case "DELETE":
            apiResponse = await apiClient.delete(externalApiUrl, header);
            break;
          default:
            res.status(405).json({error: "Method not allowed"});
            break;
        }
        return res.status(apiResponse?.status as number).json(apiResponse?.data);
      } catch (err: any) {
        if (err.response) {
          return res.status(err.response.status).json({error: err.response.data});
        }
        console.error(err);
        return res.status(500).json({error: "An error occurred"});
      }
}


function buildExternalApiUrl(queryParams: NextApiRequest["query"]): string {
    const query = new URLSearchParams();
    let fullPath = "";
    if (Array.isArray(queryParams.path) && queryParams.path.length > 0) {
      fullPath = queryParams.path.join("/");
    }
    delete queryParams.path;
    if (isEmptyObject(queryParams)) {
      return `${SERVER_API_URL}/api/${fullPath}`;
    }
  
    for (const key in queryParams) {
      query.append(key, queryParams[key] as string);
    }
    return `${SERVER_API_URL}/api/${fullPath}?${query.toString()}`;
  }
  