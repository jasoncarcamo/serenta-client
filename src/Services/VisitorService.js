const VisitorService = {
    saveToken(){
        window.localStorage.setItem("serenta-visitor", "gvghvggh")
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