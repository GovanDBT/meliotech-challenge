import { useState } from "react";
import Modal from "../components/Modal";
import bag from "../assets/bag.jpg";

const Product = () => {
  // dynamic image slider
  const [sliders, setSliders] = useState([
    {
      id: "slide1",
      img: bag,
    },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);

  // slides to the previous image
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));
  };

  // slides to the next image
  const handleNext = () => {
    setCurrentSlide((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
  };

  // function to add image to slider
  const addImageToSliders = (imageUrl: string) => {
    const newSlide = {
      id: `slide${sliders.length + 1}`,
      img: imageUrl,
    };
    setSliders((prevSliders) => [...prevSliders, newSlide]);
  };

  return (
    <div className="container mx-auto flex flex-col space-y-8 items-center place-content-center h-vh mt-8">
      {/** Title */}
      <h1 className="text-3xl font-bold">Add Image to Carousel</h1>
      {/** Image carousel */}
      <div className="carousel w-fit ">
        {sliders.map((slider, index) => (
          <div
            key={slider.id}
            id={slider.id}
            className={`carousel-item relative w-full ${
              index === currentSlide ? "block" : "hidden"
            }`}
          >
            <img src={slider.img} className="w-full rounded-xl" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button onClick={handlePrev} className="btn btn-circle">
                ❮
              </button>
              <button onClick={handleNext} className="btn btn-circle">
                ❯
              </button>
            </div>
          </div>
        ))}
      </div>
      {/** Pop-up modal component and button */}
      <div>
        <Modal addImage={addImageToSliders} />
      </div>
    </div>
  );
};

export default Product;
