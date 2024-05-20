import axios from "axios";
import authHeader from "./header/auth-header";

const API_URL = "https://localhost:7100/api/User";

class UserService {
  listAll() {
    return axios.get(API_URL, { headers: authHeader() }).then((response) => {
      return response.data;
    });
  }
  async getUserInfo() {
    try {
      const response = await axios.get(API_URL + '/GetUserInfo/0', { headers: authHeader() });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async uploadUserPhoto() {
    try {
      const response = await axios.post(API_URL + '/UploadPhoto', { headers: authHeader() });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserService();
