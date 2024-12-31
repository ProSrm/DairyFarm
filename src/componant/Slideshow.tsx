import React, { useState, useEffect } from 'react';
import "../css/SlideShow.css"
interface SlideshowProps {
    images: string[];
}


const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-96 overflow-hidden rounded-lg">
            {images.map((image: string | undefined, index: React.Key | null | undefined) => (
                <div
                    key={index}
                    className={`SlideShowImg absolute w-full h-full transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={image}
                        alt={`Slide`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'
                            }`}
                        onClick={() => setCurrentSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;