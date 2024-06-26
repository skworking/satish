"use client"
import React, { useEffect, useState } from 'react'
import AddUser from '../add/page';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'
import { IoCloseCircleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import EditUser from '../component/edituser/page';
import Editdetails from '../add/editdetails';
import * as XLSX from 'xlsx';
import { saveAs } from "file-saver";
import {  toast } from 'react-toastify';
import CustomConfirmation from '../component/common/customConfirmation';


const DisplayUser = () => {
  const [users, setUsers] = useState([]);
  const [show,setShow]=useState(false);
  const [data,setData]=useState()
  const [search,setSearch]=useState('')
  const router = useRouter()
const [deleteItemId, setDeleteItemId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)

  const fetchData = async () => {
    try {
      const result = await fetch("api/users");
      const data = await result.json();
      if (data.success) {
        setUsers(data.result);
      } else {
        console.error("Error fetching users:", data.error);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {

    fetchData();
  }, []);

  const handleConfirmDelete = async() => {
   
   let response =await fetch("api/users/"+deleteItemId,{
      method:"DELETE"
    });
    response=await response.json();
    if(response.success){
      setIsConfirmationOpen(false); // Close modal after success or error

      toast.success('Delete successful!');
      // router.push('/user-list',{scroll:false})
      fetchData()
    }
  };

  const handleCancelUpdate = () => {
    setIsConfirmationOpen(false);
  };

  const handleDelete=async(id)=>{
    setDeleteItemId(id)
    setIsConfirmationOpen(true);
    // handleConfirmDelete(id)

    // // console.log(id);
    // let response =await fetch("http://localhost:3000/api/users/"+id,{
    //   method:"DELETE"
    // });
    // response=await response.json();
    // if(response.success){

    //   toast.success('Delete successful!');
    //   // router.push('/user-list',{scroll:false})
    //   fetchData()
    // }
  }

  const handleEdit=(data)=>{
    setData(data)
    setShow(!show)

  }

  // update and cancel op
  const handleCancel=()=>{
      setShow(!show)
  }
  const handleUpdate=async(data,id)=>{
    let result=await fetch(`api/users/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(data)
    })
    result=await result.json();

    if(result.success){
      toast.success('Update successful!');
      setShow(!show)
    }
    fetchData()
  }
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },5000)
  },[])

  const handleSearch=(e)=>{
    e.preventDefault();
    const search=e.target.value;
    setSearch(search)
  }
  const searching=async()=>{
    let result=await fetch(`api/search?name=${search}`)
    const data = await result.json();
    console.log(data);
    if(data.result.length > 0 )
    toast.success('Search successful!');
    else
    toast.warning("somting went wrong")
    setUsers(data.result);
  }
  const searchCall=()=>{

   if(search.length >0){
    searching()
   }else{
    fetchData()
   }
  }


  const flattenData = users?.map(item => {
    // here we can modify which colums data we want to add 
    const flattenedItem = { ...item };

    if (flattenedItem.gallery) {
   
      // flattenedItem['Gallery ID']= (flattenedItem?.gallery[0]?._id)
      // flattenedItem.galleryThumbnail = flattenedItem.gallery.thumbnail.toString(0,32767);
      // flattenedItem.galleryOriginal = flattenedItem.gallery.original;
      // delete flattenedItem.gallery;

      // Convert gallery array to string
      flattenedItem.gallery = JSON.stringify(flattenedItem.gallery).substring(0,32767);
    }
    if(flattenedItem.images){
      flattenedItem.images = JSON.stringify(flattenedItem.images).substring(0,32767)
    }
    if(flattenedItem.tag){
      // flattenedItem['Tag Names'] = flattenedItem.tag.map(tag => tag.name).join(', ');
      // delete flattenedItem.tag;
      flattenedItem.tag=JSON.stringify(flattenedItem.tag).substring(0,32767)
    }
    if(flattenedItem.variations){
      flattenedItem.variations=JSON.stringify(flattenedItem.variations).substring(0,32767)
    }
    if(flattenedItem.variation_options){
      flattenedItem.variation_options=JSON.stringify(flattenedItem.variation_options).substring(0,32767)
    }
    return flattenedItem;
  });

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(flattenData);
    // const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Buffer to store the generated Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    
    saveAs(blob, "users.xlsx");
    toast.success('File download successfully')
  };
  
  return (
    <div className='items-center bg-white h-full'>
    
     
     {loading ? <div className='w-full  text-center m-auto'>Loading Data</div>
     :
     <div className='p-5'>
      <div className='flex w-full justify-between  p-2 bg-gray-300'>
      <h2 className='w-1/6 text-2xl font-bold text-center' >User List</h2>
      <div className='flex   items-center border-2  bg-white'>
          <input type='text' placeholder='Search User List ' name='search' onChange={(e)=>handleSearch(e)} className='outline-none p-2' />
          <CiSearch className='flex text-center mr-2' onClick={searchCall}/>
      </div>
      <button className='bg-green-300 hover:bg-green-400 text-white font-bold px-2 rounded' onClick={()=>{handleExport(users)}}>Export data</button>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg ">
        <thead className="bg-gray-200 text-gray-700 flex-1">
          <tr className=''>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Slug</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Brand</th>
           
            <th className="py-2 px-4 ">Operation</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-center ">
          {users.length>0 ? users.map(user => (
            <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 ">
              <td className="py-2 px-4">{user.name}</td>
              <td className="py-2 px-4">{user.slug}</td>
              <td className="py-2 px-4">{user.description}</td>
              <td className="py-2 px-4 flex justify-around">{user.brand}  </td>
              <td className={`py-2 px-4 sm:flex-1  ${styles.wrap} `}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={()=>handleEdit(user)}>Edit</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded " onClick={()=>{handleDelete(user._id)}}>Delete</button>
              </td>
              
            </tr>
            
          )):
          "Data not Found"
          }
        </tbody>

      </table>
    
     </div>
    }
          {show && 
          <div className='absolute top-[50px] h-screen  overflow-auto md:w-[87%] w-full   bg-gray-400 opacity-80 text-center'>
            <IoCloseCircleOutline className=' float-right  hover:bg-white bg-gray-400 w-[30px] h-[30px] text-center  p-1 rounded-full cursor-pointer' onClick={()=>{setShow(!show)}} />
              
            <Editdetails data={data} oncancel={handleCancel} onUpdate={handleUpdate}/>
           
          </div>
          }

          {isConfirmationOpen && (
                <CustomConfirmation
                  message="Are you sure you want to delete the data?"
                  onConfirm={handleConfirmDelete}
                  onCancel={handleCancelUpdate}
                />
            
          )}
    </div>
  )
}

export default DisplayUser;
