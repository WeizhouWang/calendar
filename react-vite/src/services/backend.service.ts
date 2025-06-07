import { siteDto } from "../dtos/site-dto";
import axiosInstance from "./http-interceptor";

export class backendService {
  public getSites = async () => {
    try {
      const response = await axiosInstance.get('/api/account/sites')
      return response.data as siteDto[];
    }
    catch (error) {
      //handle error here...
    }
  }
}
