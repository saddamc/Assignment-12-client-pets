import { MdOutlinePets } from "react-icons/md";
import './Inspirational.css';
import image1 from '../../assets/ins/ins-1.jpg'
import image2 from '../../assets/ins/ins-2.jpg'
import image3 from '../../assets/ins/ins-3.jpg'
import image4 from '../../assets/ins/ins-4.jpg'
import image5 from '../../assets/ins/ins-5.jpg'
import image6 from '../../assets/ins/ins-6.jpg'
import img1 from '../../assets/ins/1.png';
import img2 from '../../assets/ins/2.png';
import img3 from '../../assets/ins/3.png';
import img4 from '../../assets/ins/4.webp';
import img5 from '../../assets/ins/5.png';
import img6 from '../../assets/ins/6.png';


const Inspirational = () => {
    return (
        <section className="max-w-7xl mx-auto text-center items-center justify-center my-24">
            <div className="space-y-3">
            <p className="text-red-500 flex  justify-center text-5xl animate-bounce"> <span className="text-white">.</span> <MdOutlinePets /> </p>
            <h2 className="text-red-500 text-2xl  ">Meet the Animals</h2>
            <h2 className=" text-[#0A303A] font-bold text-5xl ">Puppies Waiting for Adoption</h2>
            <h2 className=" text-[#0A303A] mx-auto max-w-[640px]  ">Every year, approximately 6.5 million pets enter animal shelters nationwide, and 1.5 million become euthanized. And with the current shelter crisis, numbers are on the rise. But you can help! Not only are pets scientifically proven to reduce stress levels and improve blood pressure, but no one can offer unconditional love and companionship pet can.</h2>
            </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8">
                {/* card - 1 */}
           <div className="max-w-7xl max-h[900px] "> 
           <div className="card">
            <div className="image">
            <img className="relative " src={image1}/>
            <h3 className="absolute text-white text-2xl font-bold bg-[#849C44] text-center items-center mx-auto left-0 right-0 bottom-5 py-0.5">Adoptable Pets</h3>
            </div>
            <div className="details">
            <div className="center">
                <img className="w-[220px] h-[220px] items-center mx-auto" src={img1} alt="" />
                <p className="text-white px-2 text-sm">Looking to Adopt your new best friend? Saving Grace has many wonderful dogs, cats & small animals waiting for you!</p>
                <p className="text-sm text-white">Click here</p>
                
            </div>
            </div>
            </div>
           </div>
            {/* card - 2 */}
           <div className="max-w-7xl max-h[900px] "> 
           <div className="card">
            <div className="image">
            <img className="relative " src={image2}/>
            <h3 className="absolute text-white text-2xl font-bold bg-[#849C44] text-center items-center mx-auto left-0 right-0 bottom-5 py-0.5">Foster Program</h3>
            </div>
            <div className="details">
            <div className="center">
                <img className="w-[220px] h-[220px] items-center mx-auto" src={img2} alt="" />
                <p className="text-white px-2 text-sm">
                    Foster parents provide temporary clean, safe and loving home White an animal prepares for adoption. It's easy to get started.
                </p>
                <p className="text-sm text-white">Click here for more info</p>
                
            </div>
            </div>
            </div>
           </div>
            {/* card - 3 */}
           <div className="max-w-7xl max-h[900px]"> 
           <div className="card">
            <div className="image">
            <img className="relative " src={image3}/>
            <h3 className="absolute text-white text-2xl font-bold bg-[#849C44] text-center items-center mx-auto left-0 right-0 bottom-5 py-0.5">Affordable Spay/Neuter</h3>
            </div>
            <div className="details">
            <div className="center">
                <img className="w-[120px] h-[120px] items-center mx-auto" src={img3} alt="" />
                <p className=" px-2 text-sm">
                   As resources permit, Saving grace offers affordable spay/neuter services for publicly owned animals
                </p>
                
            </div>
            </div>
            </div>
           </div>
            {/* card - 4 */}
           <div className="max-w-7xl max-h[900px]"> 
           <div className="card">
            <div className="image">
            <img className="relative " src={image4}/>
            <h3 className="absolute text-white text-2xl font-bold bg-[#849C44] text-center items-center mx-auto left-0 right-0 bottom-5 py-0.5">Lost & Found</h3>
            </div>
            <div className="details">
            <div className="center">
                <img className="w-[120px] h-[120px] items-center mx-auto" src={img4} alt="" />
                <p className="text-white px-2 text-sm">
                    Here at Saving Grace, we do everything we can to help reunite people with their lost pets! Click here for our Lost & Found Page for more info
                </p>
                
            </div>
            </div>
            </div>
           </div>
            {/* card - 5 */}
           <div className="max-w-7xl max-h[900px]"> 
           <div className="card">
            <div className="image">
            <img className="relative " src={image5}/>
            <h3 className="absolute text-white text-2xl font-bold bg-[#849C44] text-center items-center mx-auto left-0 right-0 bottom-5 py-0.5">Re-Home/Surrender</h3>
            </div>
            <div className="details">
            <div className="center">
                <img className="w-[220px] h-[220px] items-center mx-auto" src={img5} alt="" />
                <p className="text-white px-2 text-sm">
                  We understand that there are circumstances where you are not able to keep your pet. Click here to learn about options.
                </p>
                
            </div>
            </div>
            </div>
           </div>
            {/* card - 6 */}
           <div className="max-w-7xl max-h[900px]"> 
           <div className="card">
            <div className="image">
            <img className="relative " src={image6}/>
            <h3 className="absolute text-white text-2xl font-bold bg-[#849C44] text-center items-center mx-auto left-0 right-0 bottom-5 py-0.5">Volunteer</h3>
            </div>
            <div className="details">
            <div className="center">
                <img className="w-[220px] h-[220px] items-center mx-auto" src={img6} alt="" />
                <p className="text-white px-2 text-sm">
                   Our volunteers are our most important asset and they do a remarkable job for the animals, the shelter and our programs.
                </p>
                <p className="text-sm text-white">Click here to learn more!</p>
                
            </div>
            </div>
            </div>
           </div>
        </div>


        </section>
    );
};

export default Inspirational;