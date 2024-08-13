import React from 'react'

function Founders_2() {
    const founders = [
        {
            desc: "Shivam Jaiswal, Founder and Managing Director, leads Symbiosis Infra with integrity and transparency, delivering exceptional service to clients.",
            name: "Mr. Shivam Jaiswal",
            role: "Founder & Managing Director",
            img: "/img/founders/mrshivam.png",
        },
        {
            desc: "Narinder Bisht, Director, leverages his Gurgaon real estate expertise to guide clients towards their perfect properties.",
            name: "Mr. Narinder Bisht",
            role: "Director",
            img: "/img/founders/mrnarinder.png",
        },
        {
            desc: "Karan Sabharwal, Director, ensures smooth operations and exceptional customer support, committed to client satisfaction.",
            name: "Mr. Karan Sabharwal",
            role: "Director",
            img: "/img/founders/mrkaran.png",
        },
    ];
    return (
        <>
        
            <div className='flex  justify-center'>
            <div className="lg:w-9/12 w-11/12 px-2 mt-8 space-y-10 text-gray-600 ">
                <h2 className="text-xl md:text-4xl lg:text-5xl  mb-4  mt-2 text-center  ">
                    Our Founders
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-[6%] gap-12">
                    {founders.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="relative">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-64 object-contain"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-opacity-35 backdrop-filter backdrop-blur-sm bg-black text-white px-4 py-3 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-sm">{item.role}</p>
                                    </div>
                                    <img className="w-10" src="/img/icon.png" alt="Logo" />
                                </div>
                            </div>
                            <div className="px-4 py-4">
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </>
    )
}

export default Founders_2