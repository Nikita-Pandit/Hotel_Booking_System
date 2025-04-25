
// import React, {useState} from 'react'
// import axios from "axios"
// const AddRooms = () => { 

//     //backend url
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     console.log(backendUrl);


//   const [roomNumber, setRoomNumber] = useState("");
//   const [price, setPrice] = useState("");
//   const [roomType, setRoomType] = useState("Standard");
//   const [description, setDescription] = useState("");
// const [availability, setAvailability] = useState(true);
// const [image, setImage] = useState("");
// const [features, setFeatures] = useState([]);
// const [bedType, setBedType] = useState("Single");
//   // const token = localStorage.getItem("token");
//   const handleFeatureChange = (feature) => {
//     if (features.includes(feature)) {
//       setFeatures(features.filter((f) => f !== feature));
//     } else {
//       setFeatures([...features, feature]);
//     }
//   };
//   const addRoom = async () => {
//     try {
//       console.log("room added")
//       console.log(roomNumber)
//       const response = await axios.post(
//         `${backendUrl}/api/admin/addRooms`,
//         { roomNumber, price, roomType,  description,
//           availability,
//           image,
//           features,
//           bedType },
//         // { headers: { Authorization: token } }
//       );
//       if(response.data.success){
//         alert("room added successfully")
//       }
//       else{
//         alert("room not added successfully")      
//       }
//     //   setRooms([...rooms, response.data]);
//     //   setRoomNumber("");
//     //   setPrice("");
//     } catch (error) {
//       console.error("Error adding room", error);
//     }
//   };
//   return (
//     <div className="mb-4 p-4 border rounded-lg">
//     <h3 className="text-xl font-semibold mb-2">Add Room</h3>
//     <input
//       type="text"
//       placeholder="Room Number"
//       value={roomNumber}
//       name="roomNumber"
//       onChange={(e) => setRoomNumber(e.target.value)}
//       className="border p-2 rounded w-full mb-2"
//     />
//     <textarea
//     placeholder="Room Description"
//     value={description}
//     onChange={(e) => setDescription(e.target.value)}
//     className="border p-2 rounded w-full mb-2"
//   />
  
//   <select
//     value={availability}
//     onChange={(e) => setAvailability(e.target.value === "true")}
//     className="border p-2 rounded w-full mb-2"
//   >
//     <option value="true">Available</option>
//     <option value="false">Not Available</option>
//   </select>
  
//   <input
//     type="text"
//     placeholder="Image URL"
//     value={image}
//     onChange={(e) => setImage(e.target.value)}
//     className="border p-2 rounded w-full mb-2"
//   />
  
//   <div className="mb-2">
//     <label className="block mb-1">Features:</label>
//     {["WiFi", "AC", "TV", "Balcony"].map((feature) => (
//       <label key={feature} className="mr-4">
//         <input
//           type="checkbox"
//           checked={features.includes(feature)}
//           onChange={() => handleFeatureChange(feature)}
//           className="mr-1"
//         />
//         {feature}
//       </label>
//     ))}
//   </div>
  
//   <select
//     value={bedType}
//     onChange={(e) => setBedType(e.target.value)}
//     className="border p-2 rounded w-full mb-2"
//   >
//     <option value="Single">Single</option>
//     <option value="Double">Double</option>
//     <option value="King">King</option>
//   </select>
  
//     <input
//       type="number"
//       placeholder="Price"
//       value={price}
//       name="price"
//       onChange={(e) => setPrice(e.target.value)}
//       className="border p-2 rounded w-full mb-2"
//     />
//     <select
//       className="border p-2 rounded w-full mb-2"
//       value={roomType}
//       onChange={(e) => setRoomType(e.target.value)}
//     >
//       <option value="Standard">Standard</option>
//       <option value="Deluxe">Deluxe</option>
//       <option value="Suite">Suite</option>
//     </select>
//     <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addRoom}>
//       Add Room
//     </button>
//   </div>
//   )
// }

// export default AddRooms



import React, { useState } from 'react';
import axios from 'axios';

const AddRooms = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [formData, setFormData] = useState({
    roomNumber: "",
    price: "",
    roomType: "Standard",
    description: "",
    availability: true,
    image: "",
    features: [],
    bedType: "Single"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'availability' ? value === "true" : value
    }));
  };

  const handleFeatureChange = (feature) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const addRoom = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    
    try {
      const response = await axios.post(
        `${backendUrl}/api/admin/addRooms`,
        formData
      );
      
      if (response.data.success) {
        setSuccessMessage("Room added successfully!");
        // Reset form
        setFormData({
          roomNumber: "",
          price: "",
          roomType: "Standard",
          description: "",
          availability: true,
          image: "",
          features: [],
          bedType: "Single"
        });
      } else {
        setErrorMessage("Failed to add room. Please try again.");
      }
    } catch (error) {
      console.error("Error adding room", error);
      setErrorMessage("An error occurred while adding the room.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6  rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Grand Horizon - Add New Room</h2>
      
      <form onSubmit={addRoom} className="space-y-4">
        {/* Room Number */}
        <div>
          <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Room Number *
          </label>
          <input
            id="roomNumber"
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
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
            value={formData.description}
            onChange={handleChange}
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
                value="true"
                checked={formData.availability === true}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">Available</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="availability"
                value="false"
                checked={formData.availability === false}
                onChange={handleChange}
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
            value={formData.image}
            onChange={handleChange}
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
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
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
              value={formData.bedType}
              onChange={handleChange}
              className="w-full  text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={formData.roomType}
              onChange={handleChange}
              className="w-full drop px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              value={formData.price}
              onChange={handleChange}
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
            {isSubmitting ? 'Adding Room...' : 'Add Room'}
          </button>
        </div>
        
        {/* Status Messages */}
        {successMessage && (
          <div className="p-3 mt-4 text-sm text-green-700 bg-green-100 rounded-md">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-3 mt-4 text-sm text-red-700 bg-red-100 rounded-md">
            {errorMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default AddRooms;