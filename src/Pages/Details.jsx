import { useEffect, useState } from "react";
import CarCard from "../Components/CarCard";
import Navbar from "../Components/Navbar";
import axios from "axios";

export default function Details() {

  const [carData, setcarData] = useState({});

  useEffect(() => {
    // Fetch car details based on carId using Axios
    axios.get(`/all-cars/${localStorage.getItem("car-id")}/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("drive-rent-access-token")}`,
      },
    })
      .then((response) => {
        console.log(response.data)
        setcarData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching car details:', error);
      });
  }, []);


  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex h-[calc(100%-64px)]">
        <div className="w-4/6 border border-gray-200">
          <div className="w-full px-5 flex flex-col justify-between h-full">

            <img src={carData.image}/>
          </div>
        </div>
        <div className="w-2/6 border border-gray-200">
          <CarCard model={carData.model} company={carData.company}/>
          <div className="flex justify-center border m-4 py-4 px-4">
            {carData.details}
          </div>
          <div className="min-w-full">
            <div className="bg-white rounded-lg py-3">
              <div className="p-2">
                <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                  {carData.user?.username}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
