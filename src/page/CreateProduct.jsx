import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../slices/productSlice';
import toast from 'react-hot-toast';
import Upload from '../component/commanCompo/Upload';
import IconBtn from '../component/commanCompo/IconBtn';
import { useNavigate } from 'react-router-dom';
import { addProduct, editProductData } from '../services/opretions/product';

const CreateProduct = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { Product, editProduct } = useSelector((state) => state.product)
    const [loading, setLoading] = useState(false)
    const { Token } = useSelector((state) => state.auth)


    useEffect(() => {
        if (editProduct) {
            setValue("Name", Product.Name)
            setValue("Price", Product.Price)
            setValue("Color", Product.Color)
            setValue("productImage", Product.ImageSrc)

            console.log("Product data in edite product : ", Product);
        }
        // console.log("editProduct .............", editProduct);
    }, []);
    console.log("editProduct .............", editProduct);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues !== Product)
            return true
        else
            return false
    }

    const onSubmit = async (data, e) => {
        e.preventDefault()
        console.log("data ", data);

        if (editProduct) {
            if (isFormUpdated()) {
                console.log("isFormUpdated in Edite ", Product);

                const currentValues = getValues()
                const formData = new FormData()

                formData.append("ProductId", Product._id)
                if (currentValues.Name !== Product.Name) {
                    formData.append("Name", data.Name)
                }
                if (currentValues.Price !== Product.Price) {
                    formData.append("Price", data.Price)
                }
                if (currentValues.Color !== Product.Color) {
                    formData.append("Color", data.Color)
                }
                if (currentValues.productImage !== Product.productImage) {
                    formData.append("productImage", data.productImage)
                }


                console.log("Edit Form data: ", formData)

                setLoading(true)

                const result = await editProductData(formData, Token)
                setLoading(false)
                if (result) {
                    toast.success("Product Edited Successfully");
                    console.log("result in Edite Product ", result);
                    dispatch(setProduct(result))
                    navigate(`/`)
                }
            }
            else {
                toast.error("No changes made to the form")
            }

            return
        }

        const formData = new FormData()
        formData.append("Name", data.Name)
        formData.append("Price", data.Price)
        formData.append("Color", data.Color)
        formData.append("productImage", data.productImage)

        console.log("formData : ", formData);

        setLoading(true);
        toast.loading("Loading")
        const result = await addProduct(formData, Token)
        // console.log("data 2", data);
        toast.dismiss();
        setLoading(false);

        if (result) {
            dispatch(setProduct(result))
            toast.success("Product Created Successfully")
            dispatch(setProduct(result))
            navigate(`/`)
        }
        else {
            toast.error("Product Creation Faild");
        }

        // setLoading(false)
        // dispatch(toast)
    }

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="custom-loader"></div>
                <h1 className=' text-blue-100 mt-4'>Loading...</h1>
            </div>
        )
    }

    return (

        <div className=" w-screen -mt-16">
            <div className='text-blue-100 flex flex-col items-center mt-14 mx-auto'>
                {
                    editProduct ? (<h1 className='text-blue-900 mb-8 text-4xl font-bold'>EDIT PRODUCT 😐😍🥳</h1>) : (<h1 className='text-blue-900 mb-8 text-4xl font-bold'>CREATE NEW PRODUCT 😍🥳</h1>)
                }
                <form className=' to-blue-900 flex flex-col gap-7 justify-center items-center text-gray-700'>

                    {/* Product name */}
                    <div className='flex flex-col'>
                        <label htmlFor="Name">
                            <span className='text-lg font-semibold'> Product Name</span>
                            <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            className='w-96 px-2 py-1 mt-1 form-style'
                            id="Name"
                            placeholder="Enter Product Name"
                            {...register("Name", { required: true })}
                        />
                        {errors.Name && (
                            <span className='text-xs text-red-500'>
                                Product Name is required
                            </span>
                        )}
                    </div>

                    {/* Product Des */}
                    <div className='flex flex-col' >
                        <label htmlFor="Price">
                            <span className='text-lg font-semibold'>Product Price</span>
                            <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            className='w-96 px-2 py-1 mt-1 form-style'
                            id="Price"
                            placeholder="Enter Product Price "
                            {...register("Price", { required: true })}
                        />
                        {errors.Price && (
                            <span className='text-xs text-red-500'>
                                Product Price is required
                            </span>
                        )}
                    </div>

                    {/* Product Color */}
                    <div className='flex flex-col' >
                        <label htmlFor="Color">
                            <span className='text-lg font-semibold'>Product Color</span>
                            <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            className='w-96 px-2 py-1 mt-1 form-style'
                            id="Color"
                            placeholder="Enter Product Color "
                            {...register("Color", { required: true })}
                        />
                        {errors.Color && (
                            <span className='text-xs text-red-500'>
                                Product Color is required
                            </span>
                        )}
                    </div>

                    {/* Upload Img */}
                    <div className=''>
                        <Upload
                            name="productImage"
                            label="Product Image"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            editData={editProduct ? Product?.ImageSrc : null}
                        />
                    </div>

                    {/* Button */}
                    <div className=' mb-11 flex justify-between w-full'>
                        <div onClick={handleSubmit(onSubmit)}>
                            <IconBtn disabled={loading} text={!editProduct ? "Create Product" : "Save Changes"} >
                                {/* <MdNavigateNext /> */}
                            </IconBtn>
                        </div>
                        <div onClick={() => navigate("/")}>
                            <IconBtn disabled={loading} text={"Cancel"} >
                                {/* <MdNavigateNext /> */}
                            </IconBtn>
                        </div>


                    </div>
                </form>
            </div>
        </div>

    )
}

export default CreateProduct
