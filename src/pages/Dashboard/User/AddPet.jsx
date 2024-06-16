import { useState } from "react";
import { imageUpload } from "../../../Api/ImageUpload";
import AddPetForm from "../../../components/Form/AddPetForm";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import useAxiosCommon from "../../../hooks/useAxiosCommon";


const AddPet = () => {
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {user} = useAuth()
  const [imagePreview, setImagePreview] = useState()
  const [imageText, setImageText] = useState('Upload Image')


  const {mutateAsync} = useMutation({
    mutationFn: async petData => {
      const {data} = await axiosSecure.post('/pet', petData)
      return data;
    },
    onSuccess: () =>{
      console.log('Data Saved Successfully')
      toast.success('Pet Added Successfully')
      navigate('/dashboard/my-pets')
      setLoading(false)
    }

  })

  // Form handler
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const category = form.category.value
    const pet_name = form.name.value;
    const location = form.location.value;
    const shortDescription = form.shortDescription.value;
    const age = form.age.value;
    const description = form.description.value;
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
        pet_name, 
        location, 
        shortDescription, 
        age, 
        description,  
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
      <title>Add Pet | Dashboard</title>
    </Helmet>
     
      {/* Form */}
      <AddPetForm 
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

export default AddPet;