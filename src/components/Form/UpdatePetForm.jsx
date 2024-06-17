/* eslint-disable react/prop-types */
import { categories } from '../Categories/CategoriesData'
// import { DateRange } from 'react-date-range'
// import { ImSpinner9 } from 'react-icons/im';
import { GrUpdate } from "react-icons/gr";
import { IoArrowRedo, IoArrowUndo } from "react-icons/io5";


const UpdatePetForm = ({
  handleSubmit,
  handleImage,
  setPetData,
  petData,
  loading,
  imagePreview,
  imageText,
//   handleDates,
//   dates,
}) => {
  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-200'>
    <form onSubmit={handleSubmit}>
    <div className="w-full flex gap-2 justify-center items-center text-center p-3  text-3xl text-black font-extrabold rounded-lg  bg-rose-500 my-6">
      <p className="text-white"> <GrUpdate /> </p>
      <p className="text-white">Update  </p>
      <h2 >Your Pet</h2>
    </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
        <div className='space-y-6'>


        <div className='space-y-1 text-sm'>
            <label htmlFor='category' className='block text-gray-600'>
              Category
            </label>
            <select
              required
              value={petData?.category}
              onChange={e => setPetData({
                ...petData, category: e.target.value
              })}
              className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
              name='category'
            >
              {categories.map(category => (
                <option value={category.label} key={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className=' p-4 bg-white w-full  m-auto rounded-lg '>
            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
              <div className='flex flex-col w-max mx-auto text-center'>
                <label>
                  <input
                    className='text-sm cursor-pointer w-36 hidden'
                    type='file'
                    value={petData?.per_image}
                    onChange={e => handleImage(e.target.files[0])}
                  //   onChange={e => {
                  //     setImagePreview(URL.createObjectURL(e.target.files[0]))
                  //   }}
                    name='image'
                    id='image'
                    accept='image/*'
                    hidden
                  />
                  <div className='bg-rose-500 text-white border  border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-600'>
                    {imageText.length > 13 ? 
                    imageText.split('.')[0].slice(0, 7) +
                    '....' +
                    imageText.split('.')[1] :
                    imageText
                    }
                  </div>
                </label>
              </div>
            </div>
              <div className="h-[150px] w-[150px] object-cover overflow-hidden flex items-center">
                  {imagePreview && <img src={imagePreview} />}
              </div>
          </div>

          

         
           
            {/* Pet Name */}
          
        </div>

        
        <div className='space-y-6'>
          <div className='space-y-1 text-sm'>
            <label htmlFor='name' className='block text-gray-600'>
              Pet Name
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
              name='name'
              id='name'
              type='text'
              placeholder='Pets Name'
              value={petData?.pet_name}
              onChange={e => setPetData({
                ...petData, pet_name: e.target.value
              })}
              required
            />
          </div>

         {/* Location */}


          <div className='space-y-1 text-sm'>
            <label htmlFor='location' className='block text-gray-600'>
              Location
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
              name='location'
              id='location'
              type='text'
              placeholder='Location'
              value={petData?.location}
              onChange={e => setPetData({
                ...petData, location: e.target.value
              })}
              required
            />
          </div>
 
          <div className='space-y-1 text-sm'>
            <label htmlFor='shortDescription' className='block text-gray-600'>
              Short Description
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
              name='shortDescription'
              id='shortDescription'
              type='text'
              placeholder='Pet or Owner'
              value={petData?.shortDescription}
              onChange={e => setPetData({
                ...petData, shortDescription: e.target.value
              })}
              required
            />
          </div>

         {/* Age */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='age' className='block text-gray-600'>
                Age
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='age'
                id='age'
                type='number'
                placeholder='Age'
                value={petData?.age}
                onChange={e => setPetData({
                    ...petData, age: e.target.value
                })}
                required
              />
            </div>

            

          <div className='space-y-1 text-sm'>
            <label htmlFor='description' className='block text-gray-600'>
              Description
            </label>
            
            <textarea
              id='description'
              className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
              name='description'
              value={petData?.description}
                onChange={e => setPetData({
                    ...petData, description: e.target.value
                })}
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex items-center text-red-500">
      <p> <IoArrowRedo />  </p>
        <button
        //   disabled={loading}
          type='submit'
          className='w-[98%] p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500 mb-6 text-2xl'
        >
          {/* {loading ? <ImSpinner9 className='animate-spin m-auto ' /> : 'Save & Continue'} */}
          Update
        </button>
        <p> <IoArrowUndo />  </p>
      </div>
    </form>
  </div>
  )
}

export default UpdatePetForm