import { useState } from "react";
import { imageUpload } from "../../../Api/ImageUpload";
import AddPetForm from "../../../components/Form/AddPetForm";
import useAuth from "../../../hooks/useAuth";


const AddPet = () => {
  const {user} = useAuth()
  const [imagePreview, setImagePreview] = useState()
  const [imageText, setImageText] = useState('Upload Image')

  // Pet handler
  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const category = form.category.value
    const name = form.name.value;
    const location = form.location.value;
    const shortDescription = form.shortDescription.value;
    const age = form.age.value;
    const description = form.description.value;
    const image = form.image.files[0]
    const userName = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }

    try{
      const image_url = await imageUpload(image)
      const petData = {
        category, name, location, shortDescription, age, description,  userName, image: image_url
      }
      console.table(petData)

    } catch (err) {
      console.log(err)
    }
  
  }

  // handle image change
  const handleImage =image =>{
    setImagePreview(URL.createObjectURL(image))
    setImageText(image.name)
  }

  return (
    <div>
     
      {/* Form */}
      <AddPetForm 
      handleSubmit={handleSubmit}
      setImagePreview={setImagePreview}
      imagePreview={imagePreview}
      handleImage={handleImage}
      setImageText={setImageText}
      imageText={imageText}
       />
      
    </div>
  );
};

export default AddPet;