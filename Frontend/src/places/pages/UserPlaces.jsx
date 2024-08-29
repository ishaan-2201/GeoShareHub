import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList";
export const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://th.bing.com/th?id=OIF.%2f2HSK2Gkl%2fUHPbUW%2fGKvxw&rs=1&pid=ImgDetMain',
        address: '20 W 34th St, New York, NY 10118, United States',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        },
        creator: 'u1'
    },
    {
         id: 'p2',
         title: 'Taj Mahal',
            description: 'One of the most beautiful buildings in the world!',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Taj_Mahal_2012.jpg',
            address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India',
            location: {
                lat: 27.1751448,
                lng: 78.0421422
            },
            creator: 'u2'
    }
]

export default function UserPlaces(){
    const userId=useParams().userId;
    const userPlaces=DUMMY_PLACES.filter(place=>place.creator===userId);
    return (
       <PlaceList items={userPlaces} />
    );  
}