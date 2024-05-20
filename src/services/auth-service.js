import axios from "axios";

const API_URL = "https://localhost:7100/api/Auth";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "/Login", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  refreshToken(request) {    
    return axios
      .post(API_URL + "/Login/refresh?token=" + request.token + "&refreshToken=" + request.refreshToken)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
