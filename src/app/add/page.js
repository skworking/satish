"use client"
import { useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import Select from 'react-select'
import { options, tags, attributetab, handleChange, handleNumberChange,handleSubmit, handleSelectOption, handleSelectAttribute, handleVariationChange, handleVariationNumberChange, handleVariationAttributeChange, handleAddVariation, handleAddVariationOption, handleImage, handleGalleryImage, handleVariationOptionBoolean, handleVariationOptionNumberChange, removeFormFields, handleRemoveVariationOption, handleImageRemove, handleVariationOptionChange } from "../component/common/comman";
import Input from "../component/Reuseable/input";
import File from "../component/Reuseable/file";
import Button from "../component/Reuseable/button";
import validateForm from "../component/common/validation";

const AddUser = () => {
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const initialVariationOption = {
    title: '',
    price: '',
    sale_price: '',
    quantity: 0,
    is_disable: 0,
    sku: '',
    options: []
  };
  const initialVriation = {
    attribute_id: 0,
    value: '',
    attribute: {
      slug: '',
      name: '',
      values: []
    }
  }

 
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: {
    },
    gallery: [],
    tag: [],
    product_type: '',
    quantity: 0,
    price: '',
    sale_price: '',
    brand: '',
    weight: '',
    min_price: '',
    max_price: '',
    variations: [initialVriation],
    variation_options: [initialVariationOption]
  });

  const handleformSubmit=async(e)=>{
    e.preventDefault()
    const errors=await validateForm(formData);
    if(errors){
      setValidationErrors(errors)
      console.log("form validation failed",errors);
    }else{
      console.log('Form validation successful. Submitting form...');
      await handleSubmit(e,formData,router)
    }
  }

  const [model, setModel] = useState(false)

  const handleSelect = (selectedOption) => {

    setSelectedOptions(selectedOption)
    setFormData(prevFormData => ({
      ...prevFormData,
      // tag: selectedOption
      tag: [
        ...selectedOption.map(option => ({
          name: option.value,
          slug: option.label
        }))
      ]
    }));
  }
  const data={
    'variations[0].attribute.name': "Attribute name is required",
    
  }
  // const variationKeys = Object.keys(validationErrors).filter(key => key.startsWith("variations"));
  //    console.log(variationKeys);
  
  return (
    <div className={styles.main}>

      <h5 className={styles.heading}>User Registration Form</h5>

      {data?.['variations[0].attribute.name']}
      <form className={`${styles.formstyle} `} method="post" >

        <div className='md:grid   lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 flex  flex-col'>
          <Input text={'name'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.name}/>
          <Input text={'slug'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.slug}/>
          <Input text={'description'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={formData.description} errors={validationErrors.description} />
          <Input text={'quantity'} onChange={(e) => handleNumberChange(e, setFormData)} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={formData.quantity} errors={validationErrors.quantity} />
          <Input text={'price'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.price} />
          <Input text={'sale_price'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.sale_price} />
          <Input text={'brand'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.brand}/>
          <Input text={'weight'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.weight}/>
          
          <File text={'Image'} onChange={(e) => handleImage(e, setFormData)} typeinput="file" option={false} stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} image={formData.image.original} errors={validationErrors?.Image} />

          <Input text={'product_type'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.product_type} />
          <Input text={'min_price'} onChange={(e) => handleNumberChange(e, setFormData)} typeinput="string" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} value={formData.min_price} errors={validationErrors.min_price} />
          <Input text={'max_price'} onChange={(e) => handleNumberChange(e, setFormData)} typeinput="string" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} value={formData.max_price} errors={validationErrors.max_price} />

          <File text={'gallery'} onChange={(e) => handleGalleryImage(e, setFormData)} typeinput="file" option={true} stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} images={formData.gallery.length} gallery={formData.gallery} onClick={(index) => handleImageRemove(index, formData, setFormData)} errors={validationErrors.gallery} />

          <div className={`md:col-span-2 px-5 mt-3 `}>

            <Select
              isMulti={true}
              value={selectedOptions}
              onChange={handleSelect}
              placeholder="Selected Tags"
              options={options}

            /> 
            <span className="text-red-400">{validationErrors.tag}</span>
          </div>

        </div>
        
   
     
      {/* { JSON.stringify(validationErrors)} */}
        <div className="">
          {formData.variations.map((option, index) => (
            <div className="mt-10" key={index}>
             
              <h1 className="text-lg text-center text-black ">Variations Form </h1>
              <div className={`md:grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 flex flex-col   `}>
                <Input text={'attribute_id'} onChange={(e) => { handleVariationNumberChange(e, index, setFormData) }} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.attribute_id} 
                     errors={validationErrors?.[`variations[${index}].attribute_id`]}
                 />

                <Input text={'value'} onChange={(e) => { handleVariationChange(e, index, setFormData) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.value} 
                 errors={validationErrors?.[`variations[${index}].value`]}
                />
                <Input text={'slug'} onChange={(e) => { handleVariationAttributeChange(e, index, setFormData) }} typeinput="text" stylediv={styles.containerdivright}
                 inputstyle={styles.containerdivinput}
                 errors={validationErrors?.[`variations[${index}].attribute.slug`]}
                />
                <Input text={'name'} onChange={(e) => { handleVariationAttributeChange(e, index, setFormData) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={`${styles.containerdivinput} `} 
                errors={validationErrors?.[`variations[${index}].attribute.name`]}
                />

                <div className={`md:col-span-2 px-5 mt-3 w-5/6 m-auto `}>
                  <Select
                    isMulti={true}
                    value={option?.attribute?.values?.name}
                    onChange={(selectedOptions) => handleSelectAttribute(selectedOptions, index, setFormData)}
                    placeholder="Selected Attribute"
                    options={attributetab}
                  />
                    <span className="text-red-400">{validationErrors?.[`variations[${index}].attribute.values`]}</span>
                </div>

              </div>

              <div className="flex w-full justify-around p-10">
                <Button onClick={(e) => removeFormFields(e, index, formData, setFormData)}
                  styles={`w-1/6 p-2 ml-10 bg-gray-300 ${formData.variations.length > 1 ? 'bg-red-500 opacity-100 text-bold' : ' opacity-50 bg-red-500 cursor-not-allowed'}`}
                  disabled={formData.variations.length <= 1}
                  text={"Remove"}
                />

                <Button onClick={(e) => handleAddVariation(e, formData, setFormData)} styles={"w-1/6 ml-10 bg-gray-300"} text="Add More" />

              </div>
            </div>
          ))}
          <span>{validationErrors.variations}</span>
        </div>

        <div>
          <h1 className="text-lg text-center  ">Variation_Options Form </h1>

          {/* {JSON.stringify(formData.variation_options.length)} */}
          {formData.variation_options.map((option, index) => (
            <div key={index}>
              <div className={`md:grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-4 flex flex-col`}>
                <Input text={'title'} onChange={(e) => { handleVariationOptionChange(e, index, setFormData) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.title} />
                <Input text={'price'} onChange={(e) => { handleVariationOptionChange(e, index, setFormData) }} typeinput="number" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.price} />
                <Input text={'sale_price'} onChange={(e) => { handleVariationOptionChange(e, index, setFormData) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.sale_price} />
                <Input text={'quantity'} onChange={(e) => { handleVariationOptionNumberChange(e, index, setFormData) }} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.quantity} />
                <Input text={'is_disable'} onChange={(e) => { handleVariationOptionBoolean(e, index, setFormData) }} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.is_disable} />
                <Input text={'sku'} onChange={(e) => { handleVariationOptionChange(e, index, setFormData) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.sku} />
                <div className={`md:col-span-1 px-5 sm:px-0 mt-3 w-5/6 m-auto `}>
                  <Select
                    isMulti={true}
                    value={option.name}
                    onChange={(selectedOption) => handleSelectOption(selectedOption, index, formData, setFormData)}
                    placeholder=" Select Options"
                    options={tags}
                  />
                </div>

              </div>

              <div className="flex w-full justify-around p-10">

                <Button onClick={(e) => handleRemoveVariationOption(e, index, formData, setFormData)}
                  styles={`w-1/6 p-2 ml-10 bg-gray-300 ${formData.variation_options.length > 1 ? 'bg-red-500 opacity-100 text-bold' : ' opacity-50 bg-red-500 cursor-not-allowed'}`}
                  disabled={formData.variation_options.length <= 1}
                  text="Remove"
                />
                <Button onClick={(e) => handleAddVariationOption(e, formData, setFormData)} styles="w-1/6 ml-10 p-2 bg-gray-300 " text="Add More" />
              </div>

            </div>
          ))}
        </div>
        <div className="flex justify-end ">

          <Button styles='sm:w-2/6 w-full text-green-500 border-2 bg-green-200 hover:bg-green-300   p-2' type="submit" onClick={(e) => handleformSubmit(e)} text={"Save"}></Button>
        </div>


      </form>

    </div>
  );
}

export default AddUser;

