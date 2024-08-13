import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";

const CounterCard = () => {
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);

    return (
        <div className="w-full flex justify-center items-center  my-10" ref={counterRef}>
            <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 w-[75%] h-full flex justify-evenly items-center p-5 gap-4">
                <div className="flex flex-col gap-10 ">
                    <div>
                        <h2 className="md:text-5xl text-white font-semibold">
                            {isVisible && <CountUp end={500} duration={2} suffix=" +" />}
                        </h2>
                        <p className="md:text-3xl text-white font-semibold">Happy Customers</p>
                    </div>
                    <div>
                        <h2 className="md:text-5xl text-white font-semibold">
                            {isVisible && <CountUp end={80} duration={2.5} suffix=" +" />}
                        </h2>
                        <p className="md:text-3xl text-white font-semibold">Projects Sold</p>
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <div>
                        <h2 className="md:text-5xl text-white font-semibold">
                            {isVisible && <CountUp end={6} duration={3} suffix=" Lac+" />}
                        </h2>
                        <p className="md:text-3xl text-white font-semibold">Square feet Sold</p>
                    </div>
                    <div>
                        <h2 className="md:text-5xl text-white font-semibold">
                            {isVisible && <CountUp end={30} duration={2.5} suffix=" +" />}
                        </h2>
                        <p className="md:text-3xl text-white font-semibold"  >Builder Associates</p>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default CounterCard;