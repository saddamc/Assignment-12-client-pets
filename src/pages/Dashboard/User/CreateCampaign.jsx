import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../../Api/ImageUpload";
import AddCampaign from "../../../components/Form/AddCampaign";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const CreateCampaign = () => {
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {user} = useAuth()
  const [imagePreview, setImagePreview] = useState()
  const [imageText, setImageText] = useState('Upload Image')


  const {mutateAsync} = useMutation({
    mutationFn: async petData => {
      const {data} = await axiosSecure.post('/campaign', petData)
      return data;
    },
    onSuccess: () =>{
      console.log('Campaign Create Successfully')
      toast.success('Campaign Create Successfully')
      navigate('/dashboard/my-campaigns')
      setLoading(false)
    }

  })

  // Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const category = form.category.value
    const campaign_name = form.campaign_name.value;
    const maxDonation = form.maxDonation.value;
    const lastDate = form.lastDate.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;
    const pet_image = form.image.files[0]
    const User = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }

    try{
      const image_url = await imageUpload(pet_image)
      const petData = {
        category, 
        campaign_name,
        maxDonation, 
        lastDate, 
        shortDescription, 
        longDescription,  
        pet_image: image_url,
        User
      }
      console.table(petData)

      // Post request to server
      await mutateAsync(petData)

    } catch (err) {
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  
  }


  // handle image change
  const handleImage =image =>{
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
  }

  return (
    <>
    <Helmet>
      <title>Campaign | Dashboard</title>
    </Helmet>
     
      {/* Form */}
      <AddCampaign
      handleSubmit={handleSubmit}
      setImagePreview={setImagePreview}
      imagePreview={imagePreview}
      handleImage={handleImage}
      setImageText={setImageText}
      imageText={imageText}
      loading={loading}
       />

       
      
    </>
  );
};

export default CreateCampaign;