"use client"
import { useState } from "react";
import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import Select from 'react-select'
import { options, tags, attributetab, handleChange, handleNumberChange, handleSubmit, handleSelectOption, handleSelectAttribute, handleVariationChange, handleVariationNumberChange, handleVariationAttributeChange, handleAddVariation, handleAddVariationOption, handleImage, handleGalleryImage, handleVariationOptionBoolean, handleVariationOptionNumberChange, removeFormFields, handleRemoveVariationOption, handleImageRemove, handleVariationOptionChange, removeFields } from "../component/common/comman";
import Input from "../component/Reuseable/input";
import File from "../component/Reuseable/file";
import Button from "../component/Reuseable/button";
import validateForm from "../component/common/validation";

import { storage } from "@/component/Firebase/firebase";
// firebase connections
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';



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
    images: [],
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

  const handleformSubmit = async (e) => {
    e.preventDefault()
    const errors = await validateForm(formData);
    if (errors) {
      setValidationErrors(errors)
      // console.log("form validation failed",errors);
    } else {
      // console.log('Form validation successful. Submitting form...');
      await handleSubmit(e, formData, router)
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

  const handleImage = async (e, index, formData, setFormData) => {
    e.preventDefault();
    console.log("caa");
    const imageFile = e.target.files[0];
    try {

      const storageRef = ref(storage, `images/${imageFile.name}`);
      const uploadTask = await uploadBytes(storageRef, imageFile);
      // Get download URL of the uploaded file
      const downloadURL = await getDownloadURL(uploadTask.ref);
      console.log('Image uploaded successfully!', downloadURL);

      const updatedImages = [...formData.images];
      updatedImages[index] = {
        thumbnail: downloadURL,
        original: downloadURL
      };

      // Update the state with the updated form data
      setFormData(prevState => ({
        ...prevState,
        images: updatedImages
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    // for local directory store images
    // try {
    //   const data = new FormData();
    //   data.append("file", file);
    //   const res = await fetch('/api/upload', { method: 'POST', body: data });
    //   if (res.ok) {
    //     console.log(res);
    //     const updatedImages = [...formData.images];
    //     updatedImages[index] = {
    //       thumbnail: file.name,
    //       original: file.name
    //     };
    //     setFormData(prevState => ({
    //       ...prevState,
    //       images: updatedImages
    //     }));
    //   } else {
    //     console.error("Failed to upload image. Status:", res);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
  }


  const handleAddImage = (e) => {
    e.preventDefault()
    setFormData(prevState => ({
      ...prevState,
      images: [...prevState.images, { thumbnail: '', original: '' }],
    }));
  };

  console.log(formData);
  const data = {
    'variations[0].attribute.name': "Attribute name is required",

  }
  // const variationKeys = Object.keys(validationErrors).filter(key => key.startsWith("variations"));
  //    console.log(variationKeys);

  return (
    <div className={styles.main}>

      <h5 className={ `m-2 text-blue-400 font-bold `}>User Registration Form</h5>

      <form className={`${styles.formstyle} `} method="post" >

        <div className='md:grid   lg:grid-cols-2  grid-cols-1 gap-4 flex  flex-col'>
          <Input text={'name'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.name} />
          <Input text={'slug'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.slug} />
          <Input text={'description'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={formData.description} errors={validationErrors.description} />
          <Input text={'quantity'} onChange={(e) => handleNumberChange(e, setFormData)} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={formData.quantity} errors={validationErrors.quantity} />
          <Input text={'price'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.price} />
          <Input text={'sale_price'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.sale_price} />
          <Input text={'brand'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.brand} />
          <Input text={'weight'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.weight} />


          <Input text={'product_type'} onChange={(e) => handleChange(e, setFormData)} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} errors={validationErrors.product_type} />
          <Input text={'min_price'} onChange={(e) => handleNumberChange(e, setFormData)} typeinput="string" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} value={formData.min_price} errors={validationErrors.min_price} />
          <Input text={'max_price'} onChange={(e) => handleNumberChange(e, setFormData)} typeinput="string" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} value={formData.max_price} errors={validationErrors.max_price} />

          <File text={'gallery'} onChange={(e) => handleGalleryImage(e, setFormData)} typeinput="file" option={true} stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} images={formData.gallery.length} gallery={formData.gallery} onClick={(index) => handleImageRemove(index, formData, setFormData)} errors={validationErrors.gallery} />

          <div className="sm:m-auto" stylediv={styles.containerdivright }  inputstyle={styles.containerdivinput}>

            <Select
              isMulti={true}
              value={selectedOptions}
              onChange={handleSelect}
              placeholder="Selected Tags"
              options={options}
             className="md:grid   lg:grid-cols-1 grid-cols-1 gap-4 flex  flex-col w-[200px]  items-center"
            />
            <span className="text-red-500">{validationErrors.tag}</span>
          </div>

          {/* <File text={'Image'} onChange={(e) => handleImage(e, setFormData)} typeinput="file" option={false} stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} image={formData.image.original} errors={validationErrors?.Image} /> */}
        </div>
        <div  className={`md:grid   lg:grid-cols-2  grid-cols-1 gap-4 flex  flex-col`} stylediv={styles.containerdivright} inputstyle={styles.containerdivinput}>
          {Object.keys(formData.images).map((key, index) => {
            const image = formData.images[key];
            console.log(image);
            return (
              <>
                <File
                  key={index}
                  text={`Image ${index + 1}`}
                  onChange={(e) => handleImage(e, index, formData, setFormData)}
                  typeinput="file"
                  option={false}
                  stylediv={styles.containerdivright }
                  inputstyle={styles.containerdivinput}
                  image={image.original}
                  errors={validationErrors?.images && validationErrors?.images[index]}
                />
                <Button onClick={(e) => removeFields(e, index, formData, setFormData)}
                  styles={`w-1/6 h-fit m-auto p-2 ml-10 bg-gray-300 ${formData.images.length > 0 ? 'bg-red-500 opacity-100 text-bold' : ' opacity-50 bg-red-500 cursor-not-allowed'}`}
                  disabled={formData.variations.length <= 1}
                  text={"Remove"}
                  
                />
              </>
            )
          })}
          <Button
            onClick={handleAddImage}
            styles={"w-[400px] m-auto p-2 bg-gray-300 "}
            text="Add Images"
          />

       
        </div>


        {/* { JSON.stringify(validationErrors)} */}
        <div className="">
          {formData.variations.map((option, index) => (
            <div className="mt-10" key={index}>

              <h1 className="text-lg text-start text-blue-400 font-bold  ">Variations </h1>
              <div className={`md:grid  lg:grid-cols-2 grid-cols-1 md:gap-4 flex flex-col   `}>
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

                <div className={` m-auto  `}>
                  <Select
                    isMulti={true}
                    value={option?.attribute?.values?.name}
                    onChange={(selectedOptions) => handleSelectAttribute(selectedOptions, index, setFormData)}
                    placeholder="Selected Attribute"
                    options={attributetab}
                    className="md:grid   lg:grid-cols-1 grid-cols-1 gap-4 flex  flex-col md:w-[400px] mt-5  items-center"
                   
                  />
                  <span className="text-red-500">{validationErrors?.[`variations[${index}].attribute.values`]}</span>
                </div>

              </div>

              <div className="flex w-full justify-around p-10">
                <Button onClick={(e) => removeFormFields(e, index, formData, setFormData)}
                  styles={`w-[400px] p-2 m-auto bg-gray-300 ${formData.variations.length > 1 ? 'bg-red-500 opacity-100 text-bold' : ' opacity-50 bg-red-500 cursor-not-allowed'}`}
                  disabled={formData.variations.length <= 1}
                  text={"Remove"}
                />

                <Button onClick={(e) => handleAddVariation(e, formData, setFormData)} styles={"w-[400px] m-auto bg-gray-300 p-2"} text="Add More" />

              </div>
            </div>
          ))}
          <span>{validationErrors.variations}</span>
        </div>

        <div>
          <h1 className="text-lg text-start text-blue-400 m-2  font-bold ">Variation_Options </h1>

          {/* {JSON.stringify(formData.variation_options.length)} */}
          {formData.variation_options.map((option, index) => (
            <div key={index}>
              <div className={`md:grid  lg:grid-cols-2  grid-cols-1 md:gap-4 flex flex-col`}>
                <Input text={'title'} onChange={(e) => { handleVariationOptionChange(e, index, setFormData) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.title}
                  errors={validationErrors?.[`variation_options[${index}].title`]}
                />
                <Input text={'price'} onChange={(e) => { handleVariationOptionChange(e, index, setFormData) }} typeinput="number" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.price}
                  errors={validationErrors?.[`variation_options[${index}].price`]}
                />
                <Input text={'sale_price'} onChange={(e) => { handleVariationOptionChange(e, index, setFormData) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.sale_price}
                  errors={validationErrors?.[`variation_options[${index}].sale_price`]}
                />
                <Input text={'quantity'} onChange={(e) => { handleVariationOptionNumberChange(e, index, setFormData) }} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.quantity}
                  errors={validationErrors?.[`variation_options[${index}].quantity`]}
                />
                <Input text={'is_disable'} onChange={(e) => { handleVariationOptionBoolean(e, index, setFormData) }} typeinput="tel" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.is_disable} />
                <Input text={'sku'} onChange={(e) => { handleVariationOptionChange(e, index, setFormData) }} typeinput="text" stylediv={styles.containerdivright} inputstyle={styles.containerdivinput} val={option?.sku}
                  errors={validationErrors?.[`variation_options[${index}].sku`]}
                />
                <div className={`m-auto `}
                >
                  <Select
                    isMulti={true}
                    value={option.name}
                    onChange={(selectedOption) => handleSelectOption(selectedOption, index, formData, setFormData)}
                    placeholder=" Select Options"
                    options={tags}
                    className="md:grid   lg:grid-cols-1 grid-cols-1 gap-4 flex  flex-col md:w-[400px] mt-5  items-center"
                  />
                  <span className="text-red-500">{validationErrors?.[`variation_options[${index}].options`]}</span>
                </div>

              </div>

              <div className="flex w-full justify-around p-10">

                <Button onClick={(e) => handleRemoveVariationOption(e, index, formData, setFormData)}
                  styles={`w-[400px] p-2 bg-gray-300 ${formData.variation_options.length > 1 ? 'bg-red-500 opacity-100 text-bold' : ' opacity-50 bg-red-500 cursor-not-allowed'}`}
                  disabled={formData.variation_options.length <= 1}
                  text="Remove"
                />
                <Button onClick={(e) => handleAddVariationOption(e, formData, setFormData)} styles="w-[400px]  p-2 bg-gray-300 " text="Add More" />
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


