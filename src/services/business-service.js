import axios from "axios";
import authHeader from "./header/auth-header";

const API_URL = "https://localhost:7100/api/Business";

class BusinessService {
  async listAllBusiness() {
    return axios.get(API_URL, { headers: authHeader() }).then((response) => {
      return response.data;
    });
  }  
}

export default new BusinessService();
