"use client"
import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import styles from '../page.module.css'

import { FaFileAlt } from "react-icons/fa";
import { IoCloseCircleOutline } from 'react-icons/io5';
import Editdetails from '../add/editdetails';
import Link from 'next/link';
import { toast } from 'react-toastify';


const ImportFile = () => {

    const [dataset, setData] = useState(null);
    const [filename, setFileName] = useState()
    const [show, setShow] = useState(false);
    let parsedData;

    useEffect(()=>{
        const dataFromSessionStorage = JSON.parse(sessionStorage.getItem('data'));
        const filename=sessionStorage?.getItem('filename')
        setFileName(filename)
        setData(dataFromSessionStorage)
    },[])

    const get = () => {
        const dataFromsessionStorage = sessionStorage.getItem('data');
        if (dataFromsessionStorage) {
            setData(JSON.parse(dataFromsessionStorage));
        }
    }
    const handleFileChange = (event) => {
        console.log("call again");
        // event.preventDefault();
        const file = event?.target?.files[0];
        // if (!file) return;
        if (file) {

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);

                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);

                // jsonData.map((item)=>{
                //   console.log(JSON.parse(item.image));
                // })
                parsedData = jsonData?.map(item => {

                    item.images = JSON.parse(item?.images);

                    if (item.gallery) {
                        item.gallery = JSON.parse(item.gallery);
                    }
                    if (item.tag) {
                        item.tag = JSON.parse(item.tag)
                    }
                    if (item.variations) {
                        item.variations = JSON.parse(item.variations);
                    }
                    if (item.variation_options) {
                        item.variation_options = JSON.parse(item.variation_options);
                    }
                    // Repeat this process for other nested properties
                    return item;
                });
                setData(parsedData)
                setFileName(file.name)
                sessionStorage.setItem("data", JSON.stringify(parsedData))
                sessionStorage.setItem("filename", file.name)
            }
            reader.readAsArrayBuffer(file);
        } else {
            console.log("dd");
        }
    }




    const handleDelete = async (id) => {

        let response = await fetch("api/users/" + id, {
            method: "DELETE"
        })
        response = await response.json();
        if (response.success === true) {
            const updatedDataset = dataset.filter(item => item._id !== id);
            sessionStorage.setItem('data', JSON.stringify(updatedDataset));
            setData(updatedDataset);
            toast("Record Deleted Success-fully")

        } else {
            toast("Failed to delete record");
        }
    }

    const handleEdit = (data) => {
        setData(data)
        setShow(!show)

    }
    const handleCancel = (e) => {
        setShow(!show)
        get()
    }

    const handleUpdate = async (data, id) => {
        let result = await fetch(`api/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        result = await result.json();


        if (result.success) {
            toast("Record Updated Succes-full");
            setShow(!show)

        }
        // fetchData()
    }
    console.log(dataset);
    return (
        <div>
        <div className='p-5'>
           
            <h1 className='text-2xl text-center'>Read Excel: {filename}</h1>
            <div className='w-full  flex justify-end  p-5 mt-5' >
                <div className='flex '>
                    <h1 className='text-xl  '>Upload File</h1>
                    <FaFileAlt className='w-fit text-3xl cursor-pointer hover:fill-slate-400' onClick={() => document.getElementById('filePicker').click()} />
                </div>
                <input type='file' id="filePicker" accept='.csv, .xlsx' style={{ display: 'none' }} onChange={handleFileChange} />
              
            </div>
           
            <table className="w-full bg-white shadow-md rounded-lg overflow-scroll inline-block sm:inline-table ">
                <thead className="bg-gray-200 text-gray-700 flex-1  ">
                    <tr className=''>
                        <th className="py-2 px-4">Name</th>
                        <th className="py-2 px-4">Slug</th>
                        <th className="py-2 px-4">Description</th>
                        <th className="py-2 px-4">Brand</th>

                        <th className="py-2 px-4 ">Operation</th>
                    </tr>
                </thead>

                <tbody className="text-gray-600 text-center ">
                    {dataset?.length > 0 && dataset?.map(user => (
                        <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100 ">
                            <td className="py-2 px-4">{user.name}</td>
                            <td className="py-2 px-4">{user.slug}</td>
                            <td className="py-2 px-4">{user.description}</td>
                            <td className="py-2 px-4 flex justify-around">{user.brand} </td>
                        
                            <td className={`py-2 px-4 sm:flex-1  ${styles.wrap} `}>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded  mr-2" onClick={() => { handleDelete(user._id) }}>Delete</button>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(user)}>Edit</button>

                            </td>
                        </tr>

                    ))
                    }
                </tbody>
            </table>
           
        </div>
            {show &&

                <div className='absolute  top-[50px] h-screen overflow-auto md:w-[88%]  w-[100%]  bg-gray-400 opacity-80 text-center'>
                    <IoCloseCircleOutline className=' float-right  hover:bg-white bg-gray-400 w-[30px] h-[30px] text-center  p-1 rounded-full cursor-pointer' onClick={handleCancel} />

                    <Editdetails data={dataset} oncancel={handleCancel} onUpdate={handleUpdate} />

                </div>
            }
        </div>

    )
}

export default ImportFile;
