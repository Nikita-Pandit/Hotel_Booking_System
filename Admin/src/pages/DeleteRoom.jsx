import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Delete = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const location=useLocation()
  const navigate=useNavigate()

  const deleteProduct=location?.state?.item
  console.log("Hello",deleteProduct)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Product deleted:', deleteProduct.stockCode);
    try {
        console.log('Product deleted2:', deleteProduct.stockCode);
      const response = await axios.post(`${backendUrl}/api/food/deleteProduct`, {
        stockCode: deleteProduct.stockCode,
      });
console.log("Deleted Product",response.data.deletedProduct)
      if (response.data.success) {
        toast.success('Product deleted successfully!', {
          style: { color: '#111' },
        });

        // const currentOrders = JSON.parse(localStorage.getItem('orders')) || [];
        // const updatedOrders = currentOrders.filter(
        //   (order) => order.stockCode !== deleteProduct.stockCode
        // );
        // localStorage.setItem('orders', JSON.stringify(updatedOrders));
        
        setTimeout(() => {
          navigate("/List");
        }, 6000);

      } else {
        throw new Error('Deletion failed.');
      }
    } 
    catch (error) {
      console.error('Error deleting the product:', error.message);
      toast.error('Product could not be deleted. Please try again.', {
        style: { color: '#111' },
      });
    }
  };
  return (
    <>
    <ToastContainer/>
      <div className='flex form-container items-center justify-center'>
    <div className='border-2 bg-zinc-700 rounded-md p-5 border-blue-300'>
    <form onSubmit={handleSubmit} action="" className='form flex  items-center justify-center flex-col space-y-4'>
    <h1 className='text-3xl'>Delete Product</h1>
      <input  className="input-field bg-zinc-500 p-3" type="text" required name="stockCode" value={deleteProduct?._id 
        || ''} readOnly placeholder='Enter stockCode' /> 
       <input className="px-5 py-2 bg-blue-500 rounded-lg  " type="submit" value="Delete product"/>
    </form>

  {/* <p className='text-center mt-5'>Already have an account?<span className='text-blue-500'><Link to="/Login">&nbsp;Login</Link></span></p> */}


    </div>
  </div>
    </>
  );
};

export default Delete;