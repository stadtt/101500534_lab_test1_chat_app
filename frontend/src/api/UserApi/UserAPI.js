import axiosInstance from "../AxiosInstance";

const UserAPI =  {

    getUsers: async ()  => {
        try{
            const response = await axiosInstance.get('/user')
            if(response.data.status){
             return response.data.data
            }
            else{
                throw new Error(response.data.message)
            }
           
        }
         catch(error){
                throw new Error("Error fetching users: " + error.message)
            }

    },
    loginUser : async (loginData) => {
          try{
            const response = await axiosInstance.post('/login', loginData)
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