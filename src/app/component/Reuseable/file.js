import React from 'react'
import { IoIosCloseCircle } from 'react-icons/io';

const File = (props) => {
   const {stylediv,inputstyle,text,typeinput,onChange,val,image,option,images,gallery,onClick}=props
  return (
    <div className={`${stylediv}`}>
        {text}:
        <input className={`${inputstyle} `}
            type={typeinput}
            accept=".png,.jpg"
            name={text}
            onChange={onChange}
            value={val}
            multiple={option}
        >  
        </input>
        <div className="flex p-2 gap-2 ">            
            <img src={image && `http://localhost:3000/Images/`+image}  className={`${!image ?'hidden':''} `} width={100} height={100} />

            {images > 0 &&
               gallery?.map((item,index) => {
                  console.log(item);
                  return (
                    <div key={item._id} className="w-[100px]  flex flex-col justify-between text-center flex-wrap">
                     <img src={item?.original ? `http://localhost:3000/Images/`+item?.original:''}  width={100} height={100} />
                      {/* <Image src={item?.original} className="  object-contain" width={200} height={100} /> */}
                      <IoIosCloseCircle  
                            className='cursor-pointer m-3 hover:fill-gray-500'
                            onClick={()=>{onClick(index)}}
                    />
                    </div>
                  )
                })

              }

        </div>
    </div>
  )
}

export default File;
