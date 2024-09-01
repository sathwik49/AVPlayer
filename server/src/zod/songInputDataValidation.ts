import zod from 'zod'

const addSongInputDataSchema = zod.object({
    "songName":zod.string({message:"Invalid Song type/name"}),
    //"songDesc","artist"  -- later
})

export const addSongValidation =  (obj:object)=>{
    try {
        const inputValidation = addSongInputDataSchema.safeParse(obj)
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