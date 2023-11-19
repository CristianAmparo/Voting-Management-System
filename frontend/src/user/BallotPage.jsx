import React, { useState, useEffect } from 'react'
import Header from './Header'
import axios from 'axios'

const BallotPage = () => {
    const [data, setData] = useState([])
    const [selectedCandidates, setSelectedCandidates] = useState({
        President: null,
        Vice_President: null,
        secretary: null,
        treasurer: null,
        first_rep: null,
    });
    const [isChecked, setIsChecked] = useState(false);


    const handleRadioChange = (position, candidateName) => {
        setSelectedCandidates((prev) => ({
        ...prev,
        [position]: candidateName,
        }));
    };
    
    

    const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    };
    console.log(selectedCandidates)
    useEffect(() => {
        axios
        .get('http://localhost:5000/api/candidates')
        .then((response) => {
            const responseData = response.data;
            setData(responseData);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

        //map all the position
        const uniquePositions = [...new Set(data.map((item) => item.position))];
        const Position = uniquePositions.map((position) => {
        const positionData = data.filter((item) => item.position === position);
        
          return (
            <div key={position} className='relative flex flex-col justify-center bg-orange-50 shadow-xl w-full md:w-5/6 lg:w-2/3 xl:w-1/2 h-max p-12 rounded-3xl'>
                <div className='absolute top-0 left-0 bg-orange-500 text-white w-1/3 text-center p-1 font-bold text-lg'>{position}</div>
                <input
                    type="radio"
                    id={`abstain${position}`}
                    name={position}
                    value={`abstain${position}`}
                    checked={selectedCandidates[position] === `abstain${position}`}
                    onChange={() => handleRadioChange(position, `abstain${position}`)}
                    className="hidden"
                />
                <label htmlFor={`abstain${position}`}>
                    <div className={`cursor-pointer  hover:bg-orange-600 absolute top-2 right-2 bg-orange-500 text-white w-28 p-0.5 text-center rounded-xl font-bold border-2  ring-red-600'  ${selectedCandidates[position] === `abstain${position}` ? 'bg-green-700' : 'bg-orange-500'}`}>Abstain</div>
                </label>
                <div className='h-max flex sm:flex-row flex-col md:items-center justify-evenly gap-5'>
                   {positionData.map((item) => { //map all data on each position
                        return (
                            <div key={item.id} className=' flex sm:flex-col gap-2 md:gap-0  items-center' >
                                <div className=' bg-orange-600 w-[86px] h-[86px] flex items-center rounded-full -mb-1'>
                                    <div className=" w-20 h-20 bg-orange-100 rounded-full overflow-hidden border-2 border-white flex justify-center items-center mx-auto">
                                        <img src={`http://localhost:5000/uploads/${item.image}`} alt="" />
                                    </div>
                                </div>
                                <div className='sm:text-center '>
                                    <div className='-space-y-2'>
                                        <h1 className='font-bold'>{item.name}</h1>
                                        <h2 className='text-orange-700'>{item.partylist}</h2>
                                    </div>
                                    <input
                                        type="radio"
                                        id={item.name}
                                        name={position}
                                        value={item.name}
                                        checked={selectedCandidates[position] === item.name}
                                        onChange={() => handleRadioChange(position, item.name)}
                                        className="hidden"
                                    />
                                    <label htmlFor={item.name}>
                                        <div className={`cursor-pointer  hover:bg-orange-600 w-32 mx-auto text-white text-center p-1 rounded-lg font-bold transition duration-300  ${selectedCandidates[position] === item.name ? 'bg-green-700' : 'bg-orange-500'}`}>
                                            {selectedCandidates[position] === item.name ? 'Voted' : 'Vote'}</div>
                                    </label>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
          );
        });


  return (
    <>
    <Header />
    <section className='fixed inset-0 top-20  h-screen w-full overflow-y-auto'>
        <div>
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl text-center"><span className='text-orange-600'>Election</span> Page</h1> 
        </div>
        <form className='flex flex-col gap-5 justify-center items-center p-2'>
            {Position}
            <div className="flex w-full md:w-5/6 lg:w-2/3 xl:w-1/2 text-xs sm:text-sm lg:text-[16px]">
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="checkbox" className="ml-2 text-gray-600 cursor-pointer">
                    I confirm that I have reviewed and agree with the provided information
                </label>
            </div>
            <div className="flex w-full md:w-5/6 lg:w-2/3 xl:w-1/2 justify-end " >
                <input type="submit" value="Submit" disabled={!isChecked}  className={`${isChecked? "bg-orange-500 hover:bg-orange-700  cursor-pointer" : "bg-gray-500" } transition duration-300 text-white text-lg font-bold rounded-xl px-10 py-2`}/>
            </div>
        </form>
    </section>
  
    </>
  )
}

export default BallotPage