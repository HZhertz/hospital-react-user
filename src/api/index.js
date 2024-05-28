import loginApiFunctions from './component/login'
import homeApiFunctions from './component/home'
import myApiFunctions from './component/my'
import appointmentRegisterApiFunctions from './component/appointmentRegister'
import medicalTreatmentApiFunctions from './component/medicalTreatment'
const api = {
  ...loginApiFunctions,
  ...homeApiFunctions,
  ...myApiFunctions,
  ...appointmentRegisterApiFunctions,
  ...medicalTreatmentApiFunctions
}
export default api
