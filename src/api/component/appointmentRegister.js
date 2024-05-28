import axios from '../../untils/axios'
const appointmentRegisterApiFunctions = {
  geDepartmentList: () => {
    return axios({
      method: 'get',
      url: '/home/geDepartmentList'
    })
  },
  getDoctorList: (params) => {
    return axios({
      method: 'get',
      url: '/home/getDoctorList',
      params
    })
  },
  getDoctorItem: (params) => {
    return axios({
      method: 'get',
      url: '/home/getDoctorItem',
      params
    })
  },
  getAppointmentRegisterInfo: (params) => {
    return axios({
      method: 'get',
      url: '/home/getAppointmentRegisterInfo',
      params
    })
  },
  addAppointmentRegister: (params) => {
    return axios({
      method: 'get',
      url: '/home/addAppointmentRegister',
      params
    })
  },
  getSystemMessage: () => {
    return axios({
      method: 'get',
      url: '/home/getSystemMessage'
    })
  },
  getReservationRecord: () => {
    return axios({
      method: 'get',
      url: '/home/getReservationRecord'
    })
  },
  removeAppointmentRegister: (params) => {
    return axios({
      method: 'get',
      url: '/home/removeAppointmentRegister',
      params
    })
  }
}
export default appointmentRegisterApiFunctions
