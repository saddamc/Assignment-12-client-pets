import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Card = ({ pet }) => {
  return (
    <Link to={`/pet/${pet?._id}`} className='col-span-1 cursor-pointer group'>
      <div className='flex relative flex-col gap-2 w-full'>
        <div
          className='
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            '
        >
          <img
            className='
                object-cover 
                h-full 
                w-full 
                group-hover:scale-110 
                transition
              '
            src={pet?.pet_image}
            alt='Room'
          />
          <div
            className='
              absolute
              top-3
              right-3
            '
          ></div>
        </div>
        <div className='font-semibold absolute text-2xl text-[#F04336] bg-white p-0.5 rounded-md bottom-6 left-20 right-20 mx-auto text-center '>{pet?.pet_name}</div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  room: PropTypes.object,
}

export default Card
