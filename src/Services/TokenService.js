const TokenService = {
    getToken(){
        return window.localStorage.getItem("serenta-user");
    },
    hasToken(){
        return TokenService.getToken();
    },
    saveToken(token){
        window.localStorage.setItem("serenta-user", token);
    },
    deleteToken(){
        window.localStorage.removeItem("serenta-user");
    }
};

module.exports = TokenService;