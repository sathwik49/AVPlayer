import axios from "axios"
import request from "../utils/request"
import { useEffect, useState } from "react"

interface loginInputs{
    username:string,
    password:string,
}

export const useLogin = ()=>{

    const [ loading,setLoading ] = useState(false);
    const [ returnMsg,setReturnMsg ] = useState("");
    const [ returnSuccess,setReturnSuccess ] = useState(null);

    const login = async (inputs:loginInputs)=>{
        try {
            setLoading(true)
            const response = await axios.post(`${request.baseUrldev}/auth/login`,{...inputs},{
                withCredentials:true,
            })
            setReturnMsg(response.data.message);
            setReturnSuccess(response.data.success);
        } catch (error:any) {
            setReturnMsg(error.response.data.message);
            setReturnSuccess(error.response.data.success);
        } finally{
            setLoading(false);
            setTimeout(()=>{},3000)
        }
    }

    return { loading,returnMsg,setReturnMsg,returnSuccess,setReturnSuccess,login} ;
}