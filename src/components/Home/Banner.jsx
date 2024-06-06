import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from "../../assets/home/bg-1.png";
import img2 from "../../assets/home/bg-2.png";
import img3 from "../../assets/home/bg-3.png";
import img4 from "../../assets/home/bg-4.png";
import img5 from "../../assets/home/bg-5.png";
import img6 from "../../assets/home/bg-6.png";

const Banner = () => {
    return (
    <Carousel>
        <div>
            <img src={img4} />
        </div>
        <div>
            <img src={img2} />
        </div>
        <div>
            <img src={img3} />
        </div>
        <div>
            <img src={img1} />
        </div>
        <div>
            <img src={img5} />
        </div>
        <div>
            <img src={img6} />
        </div>
    </Carousel>
    );
};

export default Banner;