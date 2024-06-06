import PropTypes from 'prop-types'
import queryString from 'query-string';
import { useNavigate, useSearchParams } from 'react-router-dom';



const CategoryBox = ({ label, icon: Icon }) => {
  const [params, setParams] = useSearchParams()
  const category = params.get('category')
  // console.log(category === label) /** selected item true */

  const navigate = useNavigate()
  const handleClick = () => {

    // queryString for category url
    let currentQuery = {category: label}

    const url = queryString.stringifyUrl({
      url:'/',
      query: currentQuery,
    })
    // console.log(url)
    navigate(url)
  }

  return (
    <div
      onClick={handleClick}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer ${category === label && 'border-b-red-500 text-red-500 border-b-4  '} `}
    >
      <Icon size={38} />
      <div className='text-3xl font-medium'>{label}</div>
    </div>
  )
}

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
}

export default CategoryBox
