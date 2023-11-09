import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import ButtonWavey from "../Components/ButtonWavey";
import CarCard from "../Components/CarCard";
import Navbar from "../Components/Navbar";
import CarCreateModal from '../Components/CarCreateModal';

export default function Home() {

    const [visible, setVisible] = useState(false);
    const [selectedBucket, setSelectedBucket] = useState("all-cars")
    const [cars, setcars] = useState([])
    const [updater, setUpdater] = useState(0)

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setUpdater(updater + 1)
        setVisible(false);
    };

    function getcars() {
        axios.get(`/${selectedBucket}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("drive-rent-access-token")}`
            }
        }).then(function (response) {
            // Handle the successful response here
            console.log('Response data:', response.data);

            setcars(response.data)

        }).catch(function (error) {
            // Handle any errors that occurred during the request
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        getcars()
    }, [selectedBucket, updater])


    return (
        <>
            <Modal
                title="Create car"
                open={visible}
                onCancel={hideModal}
                footer={null}
            >
                <CarCreateModal hideModal={hideModal} />
            </Modal>
            <Navbar />
            <div>
                <div className="flex justify-between items-center border p-4">
                    <div className="flex gap-x-4">
                        <ButtonWavey text={"All Cars"} onClick={() => { setSelectedBucket("all-cars") }} color="blue" />
                        <ButtonWavey text={"My Cars"} onClick={() => { setSelectedBucket("my-cars") }} color="blue" />
                    </div>
                    <div>
                        <div onClick={showModal} className="bg-blue-500 hover:bg-blue-600 text-white text-4xl w-16 h-16 rounded-full flex justify-center items-center shadow-black shadow-md">
                            +
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-4">
                    {cars.map((car, id) => {
                        return (
                            <CarCard key={id} id={car.id} model={car.model} company={car.company} number={car.number} bucket={selectedBucket} image={car.image}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
