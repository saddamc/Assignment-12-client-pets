import { categories } from '../Categories/CategoriesData'
import { ImSpinner9 } from 'react-icons/im'



const AddPetForm = ({handleSubmit, setImagePreview, imagePreview, handleImage, setImageText, imageText, loading}) => {

  return (
    <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div className='space-y-6'>


          <div className='space-y-1 text-sm'>
              <label htmlFor='category' className='block text-gray-600'>
                Category
              </label>
              <select
                required
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
                      onChange={e => handleImage(e.target.files[0])}
                    //   onChange={e => {
                    //     setImagePreview(URL.createObjectURL(e.target.files[0]))
                    //   }}
                      name='image'
                      id='image'
                      accept='image/*'
                      hidden
                    />
                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                      {imageText.length > 20 ? 
                      imageText.split('.')[0].slice(0, 15) +
                      '....' +
                      imageText.split('.')[1] :
                      imageText
                      }
                    </div>
                  </label>
                </div>
              </div>
                <div className="h-[350px] w-[350px] object-cover overflow-hidden flex items-center">
                    {imagePreview && <img src={imagePreview} />}
                </div>
            </div>

            

           
             
              {/* Calender */}
            
          </div>

          
          <div className='space-y-6'>
            <div className='space-y-1 text-sm'>
              <label htmlFor='name' className='block text-gray-600'>
                Pets Name
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                name='name'
                id='name'
                type='text'
                placeholder='Pets Name'
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
                required
              />
            </div>

           
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
              ></textarea>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          type='submit'
          className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
        >
          {loading ? <ImSpinner9 className='animate-spin m-auto' /> : 'Save & Continue'}
          
        </button>
      </form>
    </div>
  )
}

export default AddPetForm;