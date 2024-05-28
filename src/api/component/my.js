import axios from '../../untils/axios'
const myApiFunctions = {
  getPersonInfo: () => {
    return axios({
      method: 'get',
      url: '/my/getPersonInfo'
    })
  },
  addDoctorCard: (formDate) => {
    return axios({
      method: 'post',
      url: '/my/addDoctorCard',
      data: formDate
    })
  },
  getDoctorCardList: () => {
    return axios({
      method: 'get',
      url: '/my/getDoctorCardList'
    })
  },
  getDoctorCardItem: (params) => {
    return axios({
      method: 'get',
      url: '/my/getDoctorCardItem',
      params
    })
  },
  editDoctorCard: (formDate) => {
    return axios({
      method: 'post',
      url: '/my/editDoctorCard',
      data: formDate
    })
  },
  deleteDoctorCard: (id) => {
    return axios({
      method: 'get',
      url: `/my/deleteDoctorCard/${id}`
    })
  },
  editUserName: (formDate) => {
    return axios({
      method: 'post',
      url: '/my/editUserName',
      data: formDate
    })
  }
}
export default myApiFunctions
