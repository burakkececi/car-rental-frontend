/**
 * A helper class that manages the session data such as setting, deleting, getting user data or getting logged in state.
 */
class UserSessionHelper {
    user = null;
    isAuthenticated = false;
    loginTime = null;

    constructor() {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
            this.user = JSON.parse(userInfo);
            this.isAuthenticated = true;
            this.loginTime = new Date();
        }
    }

    setUser(user) {
        this.user = user;
        this.isAuthenticated = true;
        this.loginTime = new Date();
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loginTime', this.loginTime);
    }

    deleteUser() {
        localStorage.removeItem('user');
        this.user = null;
        this.isAuthenticated = false;
        this.loginTime = null;
    }

    getUser() {
        return this.user;
    }

    isAuthenticated() {
        return this.isAuthenticated;
    }

    getLoginTime() {
        return localStorage.getItem("loginTime");
    }
}

export default new UserSessionHelper();
