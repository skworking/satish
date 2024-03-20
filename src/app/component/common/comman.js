import { toast } from "react-toastify";

export const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
export const tags = [
    { value: 'Phone', label: 'phone' },
    { value: 'Apple', label: 'apple' },
    { value: 'Cilantro', label: 'cilantro' },
    { value: 'Smart TV', label: 'smart-tv' }
  ];
export const attributetab = [
    { value: '12oz', label: '12oz', id: "3" },
    { value: '24oz', label: '24oz', id: "3" },
    { value: '36oz', label: '36oz', id: "3" },

  ]


export const handleChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
export const handleNumberChange = (e,setFormData,index) => {
    e.preventDefault()
    const { name, value } = e.target;
    const newValue = !isNaN(value) && value !== '' ? parseFloat(value) : 0;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue,
   
    }));
  };
 
export const handleSubmit = async (e,formData,router) => {
    e.preventDefault();
    console.log("data", formData);
    let result = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: JSON.stringify(formData)
    });
    result = await result.json();
    if (result.success) {
      toast.success('Record Add successful!');
      router.push('/user-list');

    }
  }

export const handleSelectOption = (selectedOption, index, formData, setFormData) => {
    const updatedOptions = selectedOption.map(option => ({
      name: option.label,
      value: option.value
    }));
  
    const updatedVariationOptions = [...formData.variation_options];
    updatedVariationOptions[index] = {
      ...updatedVariationOptions[index],
      options: updatedOptions
    };
  
    setFormData(prevState => ({
      ...prevState,
      variation_options: updatedVariationOptions
    }));
};

export const handleSelectAttribute = (selectedOption, index, setFormData) => {

  const attributeOptions = selectedOption.map(option => ({
    attribute_id: option?.id, // Assuming label corresponds to the name property in options
    value: option?.value
  }));
  // setSelectedOptionsAttribute(selectedOption)
  setFormData(prevFormData => {
    const updatedVariationOptions = [...prevFormData.variations]
    updatedVariationOptions[index].attribute.values = attributeOptions;
    return {
      ...prevFormData,
      variations: updatedVariationOptions
    };
  })

}

export const handleVariationChange = (e, index,setFormData) => {

  const { name, value } = e.target;
  setFormData(prevState => ({
    ...prevState,
    variations: prevState.variations.map((option, i) => {
      if (i === index) {
        return {
          ...option,
          [name]: value
        };
      }
      return option;
    }),

  }));

}

export const handleVariationNumberChange = (e, index,setFormData) => {

  const { name, value } = e.target;
  // const parsedValue = parseFloat(value);
  const newValue = !isNaN(value) && value !== '' ? parseFloat(value) : 0;
  setFormData(prevState => ({
    ...prevState,
    variations: prevState.variations.map((option, i) => {
      if (i === index) {
        return {
          ...option,
          [name]: newValue
        };
      }
      return option;
    }),

  }));

}

export const handleVariationAttributeChange = (e, index,setFormData) => {
  e.preventDefault();
  const { name, value } = e.target;

  setFormData(prevState => ({
    ...prevState,
    variations: prevState.variations.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          attribute: {
            ...item.attribute,
            [name]: value
          }
        };
      }
      return item;
    })
  }))
}

export const handleAddVariation = (e,formData,setFormData) => {
  e.preventDefault()
  setFormData({
    ...formData,
    variations: [
      ...formData.variations,
      {
        attribute_id: '',
        value: '',
        attribute: {
          slug: '',
          name: '',
          values: []
        }
      }
    ]
  })
}

export const handleAddVariationOption = (e,formData,setFormData) => {
  e.preventDefault()
  setFormData({
    ...formData,
    variation_options: [
      ...formData.variation_options,
      {
        title: '',
        price: '',
        sale_price: '',
        quantity: 0,
        is_disable: '',
        sku: '',
        options: []
      },
    ],
  });
};

export const handleImage = async (e,setFormData) => {
  e.preventDefault();
  const file = e.target.files[0];
  try {
    const data = new FormData()
    data.append("file", file)
    const res = await fetch('/api/upload', { method: 'POST', body: data })
    if (res.ok) {
      console.log(res);
      setFormData(prevState => ({
        ...prevState,
        image: {
          ...prevState.image,
          thumbnail: file.name,
          original: file.name
        }

      }));
    } else {
      console.error("Failed to upload image. Status:", res);
    }
  } catch (err) {
    console.log(err);
  }

}

export const handleGalleryImage = async (e,setFormData) => {
  e.preventDefault();
  const files = e.target.files;
  const newGalleryImages = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: data });
      if (res.ok) {
        newGalleryImages.push({
          thumbnail: file.name,
          original: file.name
        });
      } else {
        console.error("Failed to upload image:", file.name);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  // After all uploads are complete, update the state with new gallery images
  setFormData(prevState => ({
    ...prevState,
    gallery: [
      ...prevState.gallery,
      ...newGalleryImages
    ]
  }));
};

export const handleVariationOptionBoolean = (e, index,setFormData) => {
  e.preventDefault();
  const { name } = e.target;

  setFormData(prevState => ({
    ...prevState,
    variation_options: prevState.variation_options.map((option, i) => {
      if (i === index) {

        return {
          ...option,
          [name]: !option.is_disable
        };
      }
      return option;
    })
  }));
}

export const handleVariationOptionChange = (e, index,setFormData) => {
  e.preventDefault();

  const { name, value } = e.target;
  console.log(name, value, index);

  setFormData(prevState => ({
    ...prevState,
    variation_options: prevState.variation_options.map((option, i) => {
      if (i === index) {

        return {
          ...option,
          [name]: value
        };
      }
      return option;
    })
  }));
};

export const handleVariationOptionNumberChange = (e, index,setFormData) => {

  e.preventDefault()
  const { name, value } = e.target;
  console.log(value);

  // const parsedValue = parseFloat(value);
  const newValue = !isNaN(value) && value !== '' ? parseFloat(value) : 0;
  setFormData(prevState => ({
    ...prevState,
    variation_options: prevState.variation_options.map((option, i) => {
      if (i === index) {

        return {
          ...option,
          [name]: newValue
        };
      }
      return option;
    })
  }));
};

export const removeFormFields = (e, index,formData,setFormData) => {
  e.preventDefault();
  let newvariations;
  if (formData.variations.length > 1) {
    newvariations = formData.variations.filter((_, i) => i !== index)
  } else {
    newvariations = formData.variations;
  }
  setFormData({
    ...formData,
    variations: newvariations
  });
}

export const handleRemoveVariationOption = (e, index,formData,setFormData) => {
  e.preventDefault();
  let newVariationOptions;
  if (formData.variation_options.length > 1) {
    newVariationOptions = formData.variation_options.filter((_, i) => i !== index)
  } else {
    newVariationOptions = formData.variation_options;
  }

  setFormData({
    ...formData,
    variation_options: newVariationOptions

  });
};

export const handleImageRemove = (index,formData,setFormData) => {

  let updated = [...formData.gallery]
  updated.splice(index, 1)
  setFormData({
    ...formData,
    gallery: updated
  })

}