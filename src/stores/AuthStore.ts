import { AxiosResponse } from 'axios';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { helperStore } from './../helper';

export const authStore = defineStore('auth',() =>{
  const helper = helperStore()
  const router = useRouter()


  const login = (form: formLoginInterface) =>{
    let url = '/api/auth/client-login';

    helper.http(url,'post',{data:form}, 'logeado')
      .then(async (res:any) =>{
        console.log("success",res)
        let new_token: string = res.data.accessToken;

        localStorage.setItem('token',new_token.split('|')[1]);
        await getUser()

        router.push('/')   
      })
    .catch(err =>{
      console.log("error",err);
    })
  }

  const register = (form: formRegisterInterface) => {
    let url = '/api/auth/register';

    helper.http(url,'post',{data:form}, 'registro exitoso')
    .then( (res) =>{
        console.log("success",res)
      router.push('/login')   

      })
    .catch(err =>{
      console.log("error",err);
    })
  }

  const user = ref<userModel>({
    id: 0,
    business_id: 0,
    code: "",
    name: "",
    email: "",
  })
  const setUser = () => {
    let get_user = localStorage.getItem("user")
    if(!get_user) return null
    let user_local: userModel = JSON.parse(get_user)
    user.value = user_local

  }
  
  const getUser = () => {
    return new Promise(async (resolve, reject) =>{
      let url = '/api/auth/user';
      let token = localStorage.getItem('token');
  
      let headers = {
        Authorization : `Bearer ${token}`
      }
    try{
      let res: AxiosResponse = await helper.http(url,'get',{headers})
      localStorage.setItem("user",JSON.stringify(res.data.data))
      setUser()
      resolve(true)
    }catch(err){
            // console.log("error",err);
      reject(err)

      }
    })
  }


  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    user.value = {
      id: 0,
      business_id: 0,
      code: "",
      name: "",
      email: "",
    }

    router.push('/login')
  }

  
  const confirm_code = ref(false)
  const getForgotPassword = (email: string) => {
    let url = '/api/auth/forgot-password'
    let params = { email}
    // console.log('data',data)
    helper.http(url,'get',{params}, 'correo enviado')
        .then((res)=>{
          confirm_code.value = true
        })
  }

  const confirmForgotPassword = (form: FormConfirmForgotPassword) => {
    let url = '/api/auth/verify-password-recovery'
    let data = { ...form}
    helper.http(url,'post',{data}, 'contraseña cambiada')
        .then((res)=>{
          router.push('/login')
        })
  }

  return {
    login,
    register,
    user,
    logout,
    setUser,
    confirm_code,
    getForgotPassword,
    confirmForgotPassword
  }

    interface FormConfirmForgotPassword {
        code: string,
        password: string,
        password_confirmation: string,
    }
  
  interface userModel {
    id: number,
    business_id: number,
    code: string,
    name: string,
    email: string,
    parent_id?: null,
    root_id?: null,
    password?: string,
    // created_at?: "2023-01-26T16:42:08.000000Z",
    // updated_at: "2023-01-26T16:42:08.000000Z",
    // deleted_at: null
  }

  
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
})
