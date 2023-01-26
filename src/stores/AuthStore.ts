import axios from 'axios';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const authStore = defineStore('auth',() =>{
  const router = useRouter()

  interface formLoginInterface {
    email: string,
    password: string,
  }

  interface formRegisterInterface {
    business_code : string,
    name : string,
    email : string,
    password : string,
    password_confirmation : string,
  }

  const login = (form: formLoginInterface) =>{
    let url = '/api/auth/client-login';

    axios.post(url,form)
    .then(res =>{
        console.log("success",res)
        let new_token: string = res.data.accessToken;
        localStorage.setItem('token',new_token.split('|')[1]);
        router.push('/')   
      })
    .catch(err =>{
      console.log("error",err);
    })
  }

  const register = (form: formRegisterInterface) => {
    let url = '/api/auth/register';

    axios.post(url,form)
    .then(res =>{
        console.log("success",res)
        router.push('/login')   
      })
    .catch(err =>{
      console.log("error",err);
    })
  }
  return {
    login,
    register,
  }
})
