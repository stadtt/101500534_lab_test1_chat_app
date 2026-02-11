import axiosInstance from "../AxiosInstance";

const UserAPI =  {


    loginUser : async (loginData) => {
          try{
            const response = await axiosInstance.post('/login', loginData)
            console.log(response.data)
            return response.data
          }
         catch(error){
                throw error
            }
    },
       SignUpUser : async (SignUpData) => {
          try{
            const response = await axiosInstance.post('/signup', SignUpData)
            if(response.data.status){
           
            console.log(response.data)
            return response.data
            }
            else{
                throw new Error(response.data)
            }
           
        }
         catch(error){
                throw new Error("Login Error: " + error.message)
            }
    }
    

}

export default UserAPI