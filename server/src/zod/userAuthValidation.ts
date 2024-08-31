import zod from 'zod'

const userSignupSchema = zod.object({
    "email":zod.string().email({message:"Invalid Email"}),
    "username":zod.string().min(1,{message:"Username required"}).max(25,{message:"Username should not exceed 25 characters"}),
    "password":zod.string().min(2,{message:"Password should have minimum 6 characters"})
})

export const userSignupValidation =  (obj:object)=>{
    try {
        const inputValidation = userSignupSchema.safeParse(obj)
        if(!inputValidation.success){
            let msg= "";
            inputValidation.error.issues.map(issue => msg += `${issue.message}.`)
            return { message:msg,success:inputValidation.success };
        }
        return { success:inputValidation.success };
    } catch (error:any) {
        return {errMessage:error.message,success:false};
    }
}

const userLoginSchema = zod.object({
    username:zod.string().min(1,{message:"Username required"}),
    password:zod.string().min(1,{message:"Password required"})
})

export const userLoginValidation = (obj:object)=>{
    try {
        const inputValidation = userLoginSchema.safeParse(obj)
        if(!inputValidation.success){
            let msg= "";
            inputValidation.error.issues.map(issue => msg += `${issue.message}.`)
            return { message:msg,success:inputValidation.success };
        }
        return { success:inputValidation.success };
    } catch (error:any) {
        return {errMessage:error.message};
    }
}