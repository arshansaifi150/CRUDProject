import React from 'react'



function SeachBox() {

    const places = [
        {
            name: "Gurugram"
        },
        {
            name: "Dubai"
        },
        {
            name: "Delhi"
        },
        {
            name: "Mumbai"
        },
        {
            name: "Goa"
        },
    ]

    return (
        <div className='flex justify-center items-center p-5 pt-8 rounded-2xl bg-black bg-opacity-30 '>
            <div className='flex w-full' >
            <div className=''>
                <select name="" id="" className='py-3 px-2 rounded-l-lg'>
                    {places?.map((place)=>(
                        <option value={place.name}>{place.name}</option>
                    ))}
                </select>
            </div>
            <div className='w-full'>
            <input type="text" placeholder="Search for a place" 
            className='py-3 bg-white rounded-r-lg w-full'
            />
            </div>
            </div>
        </div>
    )
}

export default SeachBox