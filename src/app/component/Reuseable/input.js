import React from 'react'

const Input = (props) => {
   const {stylediv,inputstyle,text,typeinput,onChange,val,textstyle,errors}=props
  // console.log("error",errors );
   return (
    <div className={`${stylediv}`}>
        {text}:
        <input className={`${inputstyle}`}
        type={typeinput}
        name={text}
        onChange={onChange}
        value={val}
        />
        <span className='text-red-400'>{errors}</span>
        
    </div>
  )
}

export default Input;
