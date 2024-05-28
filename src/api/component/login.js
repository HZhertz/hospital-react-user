import axios from "../../untils/axios"
const loginApiFunctions = {
    login: (data) => {
        return axios({
            method: "post",
            url: "/user/login",
            data
        })
    },
    captcha: () => {
        return axios({
            method: "get",
            url: "/user/captcha",
        })
    },
    getPhoneCode: (data) => {
        return axios({
            method: "post",
            url: "/user/getPhoneCode",
            data
        })
    },
    getPhoneCodeReguser: (data) => {
        return axios({
            method: 'post',
            url: `/user/getPhoneCodeReguser`,
            data
        })
    },
    regUser: (data) => {
        return axios({
            method: 'post',
            url: `/user/regUser`,
            data
        })
    }
}
export default loginApiFunctions