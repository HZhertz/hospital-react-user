import axios from "../../untils/axios"
const homeApiFunctions = {
    getRotographList: () => {
        return axios({
            method: "get",
            url: "/home/getRotographList",
        })
    },
    getHospitalAnnouncementList: () => {
        return axios({
            method: "get",
            url: "/home/getHospitalAnnouncementList",
        })
    },
    getHospitalAnnouncement: (params) => {
        return axios({
            method: "get",
            url: "/home/getHospitalAnnouncement",
            params
        })
    },
    getMoreHospitalAnnouncement: (params) => {
        return axios({
            method: "get",
            url: "/home/getMoreHospitalAnnouncement",
            params
        })
    },
    getHospitalAnnouncementInfo: (params) => {
        return axios({
            method: "get",
            url: "/home/getHospitalAnnouncementInfo",
            params
        })
    },
    getSystemAnnouncementAlter: () => {
        return axios({
            method: "get",
            url: "/system/getSystemAnnouncementAlter",
        })
    },
    getSystemAnnouncementAlterRead: (id) => {
        return axios({
            method: "get",
            url: `/system/getSystemAnnouncementAlterRead/${id}`,
        })
    },
    getAnnouncementList: () => {
        return axios({
            method: "get",
            url: `/home/getAnnouncementList`,
        })
    },
    getAnnouncementInfo: (params) => {
        return axios({
            method: "get",
            url: "/home/getAnnouncementInfo",
            params
        })
    },
}
export default homeApiFunctions