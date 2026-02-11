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
            console.log(response.data)
            return response.data
        }
         catch(error){
            // Extract the error message from the backend response if available
            const errorMessage = error.response?.data?.message || "Signup Error: " + error.message;
            throw new Error(errorMessage)
            }
    }
    

}

export default UserAPI