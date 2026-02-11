import axiosInstance from "../AxiosInstance";

const MessageAPI = {
    // Get all messages for a specific room
    getMessages: async (room) => {
        try {
            const response = await axiosInstance.get(`/groupmsg/getMsg/${room}`);
            return response.data.messages;
        } catch (error) {
            console.error("Error fetching messages:", error);
            throw error;
        }
    },

    // Post a new message
    postMessage: async (messageData) => {
        try {
            const response = await axiosInstance.post('/groupmsg/postMsg', messageData);
            return response.data;
        } catch (error) {
            console.error("Error posting message:", error);
            throw error;
        }
    }
};

export default MessageAPI;