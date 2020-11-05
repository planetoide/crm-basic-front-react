export const ConfigProtectRoute = {
    isAuthenticated: false,
    authenticate(cb) {
        ConfigProtectRoute.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        ConfigProtectRoute.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };