import Container from '../Shared/Container'
import CategoryBox from './CategoryBox'
import { categories } from './CategoriesData.js'
import { MdOutlinePets } from 'react-icons/md'
const Categories = () => {
  return (
    <Container>
      <div
       className="space-y-3 justify-center text-center items-center mt-24 ">
            <p className="text-red-500 flex  justify-center text-5xl animate-bounce"> <span className="text-white">.</span> <MdOutlinePets /> </p>
            <h2 className="text-red-500 text-3xl  ">Service to Breeds</h2>
            <h2 className=" text-[#0A303A] font-bold text-5xl ">Most Popular Pets Breed</h2>
            <h2 className=" text-[#0A303A] max-w-[550px] mx-auto ">Find everything you need to care for your pets, from dogs and cats to rabbits and fish. Our guides cover breed selection, training, health care, nutrition, and creating a happy environment. Get expert tips to ensure your pets live a joyful and healthy life.</h2>
      </div>
      <div
        
       className='pt-4 flex items-center gap-10 text-center justify-center overflow-x-auto mt-6'>
        {categories.map(item => (
          <CategoryBox key={item.label} label={item.label} icon={item.icon} />
        ))}
      </div>
    </Container>
  )
}

export default Categories
