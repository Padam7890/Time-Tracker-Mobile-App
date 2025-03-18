
import * as yup from 'yup'

export const taskValidationSchema = yup.object().shape({
    taskname:yup.string().required("Task Title Required").max(20),
    tasktags: yup.string().required("Task Tags Required"),
})