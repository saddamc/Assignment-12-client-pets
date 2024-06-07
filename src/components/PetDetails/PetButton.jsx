import PropTypes from 'prop-types'
import Button from '../Shared/Button/Button'

const PetButton = ({ pet }) => {
  return (
    
      
      <div className='p-4'>
        <Button label={'Adoption'} />
      </div>
    
  )
}

PetButton.propTypes = {
  room: PropTypes.object,
}

export default PetButton;
