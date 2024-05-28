import axios from "../../untils/axios"
const medicalTreatmentApiFunctions = {
    getMedicalTreatment: (params) => {
        return axios({
            method: "get",
            url: "/medicalTreatment/getMedicalTreatment",
            params
        })
    },
}
export default medicalTreatmentApiFunctions