import axios from "axios";
import React, { useState } from "react";
import { UserContext } from "./UserContext";

const url = process.env.REACT_APP_API_URL

export default function UserProvider({children}){
    const userFormSessionStoreage = sessionStorage.getItem('user');
    const [user,setUser] = useState(userFormSessionStoreage ? JSON.parse(userFormSessionStoreage):{email:'',passwor:''})

    const signUp =async ()=>{
        const json = JSON.stringify(user)
        const header = {headers : {'Content-Type':'application/json'}}
        try {
            await axios.post(url+'/user/register',json,header)
            setUser({email:'',password:''})
        } catch (error) {
            throw error
        }
    }

    const signIn =async ()=>{
        const json = JSON.stringify(user)
        const header = {headers : {'Content-Type':'application/json'}}
        try {
            const response =  await axios.post(url+'/user/login',json,header)
            // eslint-disable-next-line
            const token =response.data.token
            setUser(response.data)
            sessionStorage.setItem("user",JSON.stringify(response.data))
        } catch (error) {
            setUser({email:'',password:''})
            throw error
        }
    }
    return (
        <UserContext.Provider value ={{user, setUser, signIn, signUp}}>
        { children }
        </UserContext.Provider>        
        
    )
}