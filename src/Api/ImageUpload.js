import axios from "axios";

// image upload
export const imageUpload = async image => {
    const formData = new FormData()
    formData.append('image', image)
    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
        }`,
    formData
    )
    // console.log(data.data.display_url, "wait room picture");
    return data.data.display_url;
}