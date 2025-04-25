// import { useLocation} from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import axios from "axios"
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// // import { assets} from '../../assets/assets';


// const EditRoom= () => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     //    const [image, setImage] = useState(false);
//   const [room, setRoom] = useState({
//     roomNumber:'',
//     price:'',
//     roomType:'Standard',
//   description:"",
//    availability:true,
//  image:"",
//  features:[],
//     bedType:"Single"
//   });
// const location=useLocation()
// const editRoom=location?.state?.item
// const id=editRoom._id;
// console.log("id in EditRoom", id);
// useEffect(() => {
//   if ( editRoom) {
//     setRoom({
//       roomNumber: editRoom.roomNumber || '',
//       price: editRoom.price || '',
//       roomType: editRoom.roomType || 'Standard',
//     });
//   }
// }, []);
//   const onChangeHandler = (e) => {
//     const { name, value } = e.target;
//     setRoom({ ...room, [name]: value });
//   };


// const updateRoom = async () => {
//   if (!id) {
//     toast.error("Room ID not found. Cannot update.");
//     return;
//   }

//   try {
//     const response = await axios.put(
//       `${backendUrl}/api/admin/editroom/${id}`,
//       room
//     );

//     if (response.data.success) {
//       toast.success("Room updated successfully", { style: { color: "#111" } });
//       setRoom(response.data.updatedRoom);
//     }
//   } catch (error) {
//     toast.error(`Error updating room: ${error.message}`);
//   }
// };

//   return (
//     <>

// <ToastContainer/>
// <div className="mb-4 p-4 border rounded-lg">
//     <h3 className="text-xl font-semibold mb-2">Add Room</h3>
//     <input
//       type="text"
//       placeholder="Room Number"
//       value={room.roomNumber}
//       name="roomNumber"
//       onChange={onChangeHandler}
//       className="border p-2 rounded w-full mb-2"
//     />
//     <input
//       type="number"
//       placeholder="Price"
//       value={room.price}
//       name="price"
//       onChange={onChangeHandler}
//       className="border p-2 rounded w-full mb-2"
//     />
//     <select
//       className="border p-2 rounded w-full mb-2"
//       name="roomType"
//       value={room.roomType}
//      onChange={onChangeHandler}
//     >
//       <option value="Standard">Standard</option>
//       <option value="Deluxe">Deluxe</option>
//       <option value="Suite">Suite</option>
//     </select>
//     <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={updateRoom}>
//     update Room
//     </button>
//   </div>
//        </>
//   );
// };
// export default EditRoom;




// import { useLocation } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const EditRoom = () => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const [room, setRoom] = useState({
//     roomNumber: '',
//     price: '',
//     roomType: 'Standard',
//     description: '',
//     availability: true,
//     image: '',
//     features: [],
//     bedType: 'Single'
//   });

//   const location = useLocation();
//   const editRoom = location?.state?.item;
//   const id = editRoom?._id;

//   useEffect(() => {
//     if (editRoom) {
//       setRoom({
//         roomNumber: editRoom.roomNumber || '',
//         price: editRoom.price || '',
//         roomType: editRoom.roomType || 'Standard',
//         description: editRoom.description || '',
//         availability: editRoom.availability ?? true,
//         image: editRoom.image || '',
//         features: editRoom.features || [],
//         bedType: editRoom.bedType || 'Single'
//       });
//     }
//   }, [editRoom]);

//   const onChangeHandler = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'features') {
//       const newFeatures = checked
//         ? [...room.features, value]
//         : room.features.filter(f => f !== value);
//       setRoom({ ...room, features: newFeatures });
//     } else if (type === 'checkbox' && name === 'availability') {
//       setRoom({ ...room, availability: checked });
//     } else {
//       setRoom({ ...room, [name]: value });
//     }
//   };

//   const updateRoom = async () => {
//     if (!id) {
//       toast.error("Room ID not found. Cannot update.");
//       return;
//     }

//     try {
//       const response = await axios.put(`${backendUrl}/api/admin/editroom/${id}`, room);

//       if (response.data.success) {
//         toast.success("Room updated successfully", { style: { color: "#111" } });
//         setRoom(response.data.updatedRoom);
//       }
//     } catch (error) {
//       toast.error(`Error updating room: ${error.message}`);
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="mb-4 p-4 border rounded-lg">
//         <h3 className="text-xl font-semibold mb-2">Edit Room</h3>

//         <input
//           type="text"
//           placeholder="Room Number"
//           value={room.roomNumber}
//           name="roomNumber"
//           onChange={onChangeHandler}
//           className="border p-2 rounded w-full mb-2"
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={room.price}
//           name="price"
//           onChange={onChangeHandler}
//           className="border p-2 rounded w-full mb-2"
//         />

//         <select
//           className="border p-2 rounded w-full mb-2"
//           name="roomType"
//           value={room.roomType}
//           onChange={onChangeHandler}
//         >
//           <option value="Standard">Standard</option>
//           <option value="Deluxe">Deluxe</option>
//           <option value="Suite">Suite</option>
//         </select>

//         <textarea
//           placeholder="Description"
//           value={room.description}
//           name="description"
//           onChange={onChangeHandler}
//           className="border p-2 rounded w-full mb-2"
//         />

//         <input
//           type="text"
//           placeholder="Image URL"
//           value={room.image}
//           name="image"
//           onChange={onChangeHandler}
//           className="border p-2 rounded w-full mb-2"
//         />

//         <div className="flex items-center mb-2 gap-2">
//           <label className="mr-2">Availability:</label>
//           <input
//             type="checkbox"
//             name="availability"
//             checked={room.availability}
//             onChange={onChangeHandler}
//           />
//           <span>{room.availability ? 'Available' : 'Not Available'}</span>
//         </div>

//         <div className="mb-2">
//           <label className="block font-medium mb-1">Features:</label>
//           {['WiFi', 'AC', 'TV', 'Balcony'].map((feature) => (
//             <label key={feature} className="inline-flex items-center mr-4">
//               <input
//                 type="checkbox"
//                 name="features"
//                 value={feature}
//                 checked={room.features.includes(feature)}
//                 onChange={onChangeHandler}
//                 className="mr-1"
//               />
//               {feature}
//             </label>
//           ))}
//         </div>

//         <select
//           className="border p-2 rounded w-full mb-4"
//           name="bedType"
//           value={room.bedType}
//           onChange={onChangeHandler}
//         >
//           <option value="Single">Single</option>
//           <option value="Double">Double</option>
//           <option value="King">King</option>
//         </select>

//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={updateRoom}
//         >
//           Update Room
//         </button>
//       </div>
//     </>
//   );
// };

// export default EditRoom;

import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditRoom = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [room, setRoom] = useState({
    roomNumber: '',
    price: '',
    roomType: 'Standard',
    description: '',
    availability: true,
    image: '',
    features: [],
    bedType: 'Single'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const editRoom = location?.state?.item;
  const id = editRoom?._id;

  useEffect(() => {
    if (editRoom) {
      setRoom({
        roomNumber: editRoom.roomNumber || '',
        price: editRoom.price || '',
        roomType: editRoom.roomType || 'Standard',
        description: editRoom.description || '',
        availability: editRoom.availability ?? true,
        image: editRoom.image || '',
        features: editRoom.features || [],
        bedType: editRoom.bedType || 'Single'
      });
    }
  }, [editRoom]);

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox' && name === 'features') {
      const newFeatures = checked
        ? [...room.features, value]
        : room.features.filter(f => f !== value);
      setRoom({ ...room, features: newFeatures });
    } else {
      setRoom({ ...room, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const updateRoom = async (e) => {
    e.preventDefault();
    
    if (!id) {
      toast.error("Room ID not found. Cannot update.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(`${backendUrl}/api/admin/editroom/${id}`, room);

      if (response.data.success) {
        toast.success("Room updated successfully");
        setRoom(response.data.updatedRoom);
      } else {
        toast.error("Failed to update room");
      }
    } catch (error) {
      toast.error(`Error updating room: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6  rounded-lg shadow-md">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Grand Horizon - Edit Room</h2>
      
      <form onSubmit={updateRoom} className="space-y-4">
        {/* Room Number */}
        <div>
          <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Room Number *
          </label>
          <input
            id="roomNumber"
            type="text"
            name="roomNumber"
            value={room.roomNumber}
            onChange={onChangeHandler}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Room Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Room Description *
          </label>
          <textarea
            id="description"
            name="description"
            value={room.description}
            onChange={onChangeHandler}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability *
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="availability"
                value={true}
                checked={room.availability === true}
                onChange={onChangeHandler}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Available</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="availability"
                value={false}
                checked={room.availability === false}
                onChange={onChangeHandler}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Not Available</span>
            </label>
          </div>
        </div>
        
        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL *
          </label>
          <input
            id="image"
            type="url"
            name="image"
            value={room.image}
            onChange={onChangeHandler}
            required
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["WiFi", "AC", "TV", "Balcony"].map((feature) => (
              <label key={feature} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="features"
                  value={feature}
                  checked={room.features.includes(feature)}
                  onChange={onChangeHandler}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>
        
        {/* Bed Type and Room Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bedType" className="block text-sm font-medium text-gray-700 mb-1">
              Bed Type *
            </label>
            <select
              id="bedType"
              name="bedType"
              value={room.bedType}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="King">King</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 mb-1">
              Room Type *
            </label>
            <select
              id="roomType"
              name="roomType"
              value={room.roomType}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
            </select>
          </div>
        </div>
        
        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price (per night) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              id="price"
              type="number"
              name="price"
              value={room.price}
              onChange={onChangeHandler}
              required
              min="0"
              step="0.01"
              className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Updating Room...' : 'Update Room'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoom;