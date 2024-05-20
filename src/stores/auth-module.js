import AuthService from "../services/auth-service";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  namespaced: true,
  state: () => ({
    user: {},
    status: { loggedIn: false },
  }),
  actions: {
    login(user) {
      return AuthService.login(user).then(
        (user) => {          
          this.status.loggedIn = true;
          this.user = user;
          return Promise.resolve(user);
        },
        (error) => {
          this.status.loggedIn = false;
          this.user = null;
          return Promise.reject(error);
        }
      );
    },
    refreshToken(request) {      
      return AuthService.refreshToken(request).then(
        (user) => {          
          this.status.loggedIn = true;
          this.user = user;
          return Promise.resolve(user);
        },
        (error) => {
          this.status.loggedIn = false;
          this.user = null;
          return Promise.reject(error);
        }
      );
    },
    logout() {
      AuthService.logout();
      this.status.loggedIn = false;
      this.user = null;
    },
    setState() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.status.loggedIn = true;
        this.user = user;
      } else {
        this.user = null;
        this.status.loggedIn = false;
      }
    },
  },
});
