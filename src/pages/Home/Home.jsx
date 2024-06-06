import { Helmet } from 'react-helmet-async';
import Categories from '../../components/Categories/Categories';
import Banner from '../../components/Home/Banner';
import Pets from '../../components/Home/Pets';
import Inspirational from '../../components/Home/Inspirational';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>  Petco | Home - Pet Adoption </title>
      </Helmet>
      {/* banner */}
      <Banner/>
      {/* Categories section  */}
      <Categories />
      {/* Pets section */}
      <Pets />
      {/* Inspiration */}
      <Inspirational />
    </div>
  )
}

export default Home
