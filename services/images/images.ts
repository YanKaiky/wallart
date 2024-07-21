import axios from "axios";
import { base_url } from "../api_url";

export interface IhandleImagesResponse {
  success: boolean;
  data?: any;
  message?: any;
}

class ImagesService {
  public async getImages(params?: any): Promise<IhandleImagesResponse> {
    try {
      let url = `${base_url}&per_page=25&editors_choice=true`;

      if (params) {
        const paramKeys = Object.keys(params);

        paramKeys.forEach((key) => {
          const value =
            key === "q" ? encodeURIComponent(params[key]) : params[key];
          url += `&${key}=${value}`;
        });
      }

      const response = await axios.get(url);

      return { success: true, data: response.data?.hits };
    } catch (error: any) {
      console.error(error);

      return { success: false, message: error.message };
    }
  }
}

export default new ImagesService();
