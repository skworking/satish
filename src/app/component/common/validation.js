import * as yup from 'yup';
const variationSchema = yup.object().shape({
  attribute_id: yup.number().positive('Attribute ID must be a positive number').required('Attribute ID is required'),
  value: yup.string().required('Value is required'),
  attribute: yup.object().shape({
    slug: yup.string().required('Attribute slug is required'),
    name: yup.string().required('Attribute name is required'),
    values: yup.array().min(1, 'Attribute values must contain at least one value')
  })
});

const formSchema = yup.object().shape({
  name: yup.string().required('Name is Required'),
  slug: yup.string().required('Slug is required'),
  description: yup.string().required("description is required"),

  quantity: yup.number().required("Number is required").moreThan(0, 'Quantity must be greater then 0'),
  price: yup.string()
    .required('Price is required')
    .test('is-positive', 'Price should be a positive number greater than 100', value => {
      if (!value) return false; // Return false if value is empty
      const numericValue = Number(value);
      return !isNaN(numericValue) && numericValue > 100; // Check if numeric value is greater than 100
    }),
  sale_price: yup.string()
    .required('sale_price is required')
    .test('is-positive', 'sale_price should be a positive number greater than 100', value => {
      if (!value) return false; // Return false if value is empty
      const numericValue = Number(value);
      return !isNaN(numericValue) && numericValue > 100; // Check if numeric value is greater than 100
    }),
  brand: yup.string().required("brand name is required"),
  weight: yup.string().required("weight is required"),
  product_type: yup.string().required("category type of product is required"),
  min_price: yup.string().required("min_price is required").test('is-positive', 'min_price should be a positive number greater than 100', value => {
    if (!value) return false; // Return false if value is empty
    const numericValue = Number(value);
    return !isNaN(numericValue) && numericValue > 100; // Check if numeric value is greater than 100
  }),
  max_price: yup.string().required("max_price is required").test('is-positive', 'max_price should be a positive number less than 10000 and greter then 100', value => {
    if (!value) return false; // Return false if value is empty
    const numericValue = Number(value);
    return !isNaN(numericValue) && numericValue < 10000 && numericValue > 100; // Check if numeric value is greater than 100
  }),
  gallery: yup.array().min(1, 'Gallery should contain at least one image'),

  Image: yup.object().test('is-required', 'Image is required', value => {
    return !!value;
    // return value && Object.keys(value).length > 0;
  }),
 
  tag: yup.array().min(1, "minimum 1 tag should be selected"),
  variations: yup.array().of(variationSchema).min(1, 'Please add at least one variation'),

});

const validateForm = async (data) => {
  try {
    await formSchema.validate(data, { abortEarly: false });
    return null; // No errors
  } catch (errors) {

    const errorMessages = {};
    errors.inner.forEach(err => {
      errorMessages[err.path] = err.message;
    });
    return errorMessages;
  }

};

export default validateForm;