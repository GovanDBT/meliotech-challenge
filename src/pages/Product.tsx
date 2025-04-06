import { useState } from "react";
import Modal from "../components/Modal";
import bag from "../assets/bag.jpg";

const Product = () => {
  const [sliders, setSliders] = useState([
    {
      id: "slide1",
      img: bag,
    },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliders.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === sliders.length - 1 ? 0 : prev + 1));
  };

  const addImageToSliders = (imageUrl: string) => {
    const newSlide = {
      id: `slide${sliders.length + 1}`,
      img: imageUrl,
    };
    setSliders((prevSliders) => [...prevSliders, newSlide]);
  };

  return (
    <div className="container mx-auto flex flex-col space-y-5 items-center place-content-center h-dvh">
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
      <div>
        <Modal addImage={addImageToSliders} />
      </div>
    </div>
  );
};

export default Product;
