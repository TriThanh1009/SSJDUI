import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL;


export const DecodeToken = async (token: string) => {
    try {
        const response = await axios.get(`${apiUrl}/Login`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token dưới dạng Bearer
                Accept: "text/plain",
            },
        });
        return response.data[1]; // Lấy role từ phản hồi
    } catch (error) {
        console.error("Lỗi khi decode token:", error);
        return null;
    }
};
