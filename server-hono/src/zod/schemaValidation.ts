import zod from "zod"

const userSignupSchema = zod.object({
    username: zod.string().min(3).max(20),
    email: zod.string().email(),
    password: zod.string().min(6),
    mobile:zod.string()
})

export const userSignupValidation =  (obj:object)=>{
    try {
        const inputValidation = userSignupSchema.safeParse(obj)
        if(!inputValidation.success){
            let msg= "";
            inputValidation.error.issues.map(issue => msg += `${issue.path}:${issue.message},  `)
            return { message:msg,success:inputValidation.success };
        }
        return { success:inputValidation.success };
    } catch (error:any) {
        
        return {errMessage:error.message};
    }
}

const userLoginSchema = zod.object({
    username:zod.string(),
    password:zod.string()
})

export const userLoginValidation = (obj:object)=>{
    try {
        const inputValidation = userLoginSchema.safeParse(obj)
        if(!inputValidation.success){
            let msg= "";
            inputValidation.error.issues.map(issue => msg += `${issue.path}:${issue.message},  `)
            return { message:msg,success:inputValidation.success };
        }
        return { success:inputValidation.success };
    } catch (error:any) {
        return {errMessage:error.message};
    }
}