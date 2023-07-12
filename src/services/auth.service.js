import Request from '../helpers/RequestHelper';

const login = async (user) => {
    const res = await Request("post", "/auth/login", user);
    return res;
}

const authService = {
    login,
};

export default authService;