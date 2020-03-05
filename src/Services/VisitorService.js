const { v4 } = require("uuid");

const VisitorService = {
    saveToken(){
        window.localStorage.setItem("serenta-visitor", v4())
    },
    getToken(){
        return window.localStorage.getItem("serenta-visitor");
    },
    hasToken(){
        return VisitorService.getToken();
    },
    deleteToken(){
        window.localStorage.removeItem("serenta-visitor");
    }
};

module.exports = VisitorService