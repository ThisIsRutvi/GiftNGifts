import React, { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button, Rating,FormControl, InputLabel } from '@mui/material';
import UploadImageBox from '../../Components/UploadBox/UploadImageBox';
import { MdClose } from "react-icons/md";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useEffect } from 'react';
import axios from 'axios';

function AddProduct() {

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [Product,setProduct] = useState({
    title: "",
    description: "",
    categoryname: "",
    subcategory: "",
    price: "",
    oldprice: "",
    discount: "",
    ingredients: "",
    brand: "",
    size: "",
    additional_details: "",
    images: []
})

useEffect(() => {
  fetchCategories();
  fetchSubcategories();
}, []);

const fetchCategories = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/getcategories');
    setCategories(response.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const fetchSubcategories = async () => {
  try {
    const response = await axios.get('http://localhost:7000/api/getsubcategories');
    setSubcategories(response.data);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
  }
};

const handleChange = (e) => {
  setProduct({ ...Product, [e.target.name]: e.target.value });
};
const handleSelectChange = (name) => (event) => {
  setProduct({ ...Product, [name]: event.target.value });
};

const handleImageUpload = (images) => {
  setProduct((prevProduct) => ({ ...prevProduct, images }));
};
  const addproduct = async(e)=>{

      e.preventDefault();
      try{
          const response = await fetch('http://localhost:7000/api/addproduct',{
            method:'POST',
            headers:{
              "Accept":'application/json',
              "Content-Type":"application/json"
            },
            body:JSON.stringify(Product)
          })

          const data = await response.json();

    if (data.success) {
      alert("Product added successfully");
    } else {
      alert("Failed to add: " + data.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
  }

  return (
    <section className="p-5 bg-gray-50">
      <form action="" className=' py-2 px-10'>
        <div className="grid grid-cols-1 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1' >Product Title</h3>
          <input type="text" name='title' value={Product.title} onChange={handleChange} className='w-full p-3 text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] bg-white '/>
        </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Description</h3>
          <input type="text" name='description' value={Product.description} onChange={handleChange}  className='w-full p-3 text-sm h-[100px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] bg-white '/>
        </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Category </h3>
          <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={Product.categoryname} onChange={handleSelectChange('categoryname')}>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category._id}>{category.categoryname}</MenuItem>
            ))}
          </Select>
        </FormControl>

        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1' >Product SubCategory </h3>
          <FormControl fullWidth>
          <InputLabel>Subcategory</InputLabel>
          <Select value={Product.subcategory} onChange={handleSelectChange('subcategory')}>
  {subcategories.map((subcategory) => (
    <MenuItem key={subcategory._id} value={subcategory._id}>{subcategory.subcategory}</MenuItem>
  ))}
</Select>

        </FormControl>


        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1' >Product Price </h3>
          <input type="Number" name='price' value={Product.price} onChange={handleChange} className='w-full p-3 bg-white text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        
        </div>
        <div className="grid grid-cols-3 gap-5 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1' >Product OldPrice</h3>
          <input type="Number" name='oldprice' value={Product.oldprice} onChange={handleChange} className='w-full p-3 text-sm bg-white h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1' >Product Discount</h3>
          <input type="text" name='discount' value={Product.discount} onChange={handleChange} className='w-full p-3 text-sm bg-white h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Ingredients</h3>
          <input type="text"  name='ingredients' value={Product.ingredients} onChange={handleChange} className='w-full p-3 text-sm bg-white h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1' >Product Brand </h3>
          <input type="text" name='brand' value={Product.brand} onChange={handleChange} className='w-full p-3  bg-white text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Product Size</h3>
          <input type="text" name='size' value={Product.size} onChange={handleChange} className='w-full p-3 bg-white  text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        <div className="col">
          <h3 className='text-[14px] pl-1 font-[500] mb-1' >Product Rating</h3>
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
        </div>
        </div>
        <div className="grid grid-cols-1 mb-3">
        <div className="col">
          <h3 className='text-[14px] font-[500] mb-1'>Aditional Details</h3>
          <input type="text"  name='additional_details' value={Product.additional_details} onChange={handleChange} className='w-full p-3 bg-white text-sm h-[40px] border border[rgba(0,0,0,0.1)] focus:outline-none focus:border border-[rgba(0,0,0,0.4)] '/>
        </div>
        </div>

        {/* uload img */}
        <div className="uploadimg w-full p-2 px-1">
          <h3 className='font-[600] text-[18px]'>Media & Images</h3>
          <div className="grid grid-cols-6 gap-4 py-4 ">
          <div className='uploadBox relative flex flex-col !items-center !justify-center !rounded-sm  border-bashed border-1 border-[rgba(0,0,0,0.4)] bg-gray-100  hover:bg-gray-200 cursor-pointer  w-[100%] h-[170px]'>
          <span className='absolute -top-[10px] -right-[5px] w-[20px] h-[20px] rounded-full flex items-center justify-center bg-red-700 '><MdClose className='text-white text-[16px]'/></span>
          
          </div>
          <div className="grid grid-cols-3 gap-5 mb-3">
          <div className="mb-4">
  <h3 className='text-[14px] font-[500] mb-1'>Upload Images</h3>
  <UploadImageBox onUpload={handleImageUpload} />
</div>

          </div>
          </div>
        </div>
        
        <br />
        {/* submit btn */}
         <Button type="button" className="flex items-center justify-center gap-2 btn-blue btn-lg w-[30%]" onClick={addproduct}>
          <MdOutlineCloudUpload className='text-[22px]' />Upload Product</Button>

         </form>
    </section>
  )
}

export default AddProduct
