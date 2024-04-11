import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../../slices/cartSlice';
import { RiDeleteBinLine } from 'react-icons/ri';
import ConfirmationModal from '../commanCompo/ConfirmationModal';
import { LuPencilLine } from 'react-icons/lu';
import { setEditProduct, setProduct } from "../../slices/productSlice"
import { deleteProduct } from '../../services/opretions/product';

const ProductCard = ({ products }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const {Token} = useSelector((state) => state.auth);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [count, setCount] = useState(0);

    const decreseCountHandler = () => {
        setCount(count - 1);
    }

    const increseCountHandler = () => {
        setCount()
    }

    const CartHandler = (product) => {
        dispatch(addToCart(product));
    };

    const EditHandler = (product) => {
        dispatch(setProduct(product));
        dispatch(setEditProduct(true));
        navigate(`/product-edite/${product?._id}`);
    };

    const DeleteHandler = async (product) => {
        // const eventId = data?._id;
        // setLoading(true);
        const res = await deleteProduct(product?._id, Token)

        console.log("res in eventDetails ", res);

        if (!res.success) {
            // toast.success("Event Deleted Successfully");
            dispatch(setProduct(null));
        }
        navigate("/");
        setConfirmationModal(null);
        // setLoading(false);
    };

    return (
        <>
            <div className='flex flex-col w-10/12 mx-auto gap-9 justify-center items-center'>
                <h2 className='text-gray-900 font-semibold text-2xl'>All Product</h2>
                <div className='flex flex-wrap mx-auto gap-10 lg:flex-row'>
                    {products.map((product) => (
                        <div key={product.id} className='w-[17rem] border p-3 shadow-md'>
                            <img src={product.ImageSrc} alt="ProductImage" />
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>{product.Name}</p>
                                <p>₹{product.Price}</p>
                            </div>
                            <div className='text-gray-500'>{product.Color}</div>
                            <div className='flex justify-center '>
                                {user && user.AccountType === "Admin" && (
                                    <div className='flex justify-between w-full'>
                                        <div className='flex gap-2 justify-cente align-middle text-white bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg' onClick={() => EditHandler(product)}>
                                            <button className="">Edit</button>
                                            <LuPencilLine className=' mt-1' />
                                        </div>
                                        <div className='flex gap-2 items-center justify-center text-red-500 bg-red-200 border-0 py-2 px-3 focus:outline-none hover:bg-red-300 rounded-md text-lg'
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this Event?",
                                                    text2: "All the data related to this Event will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => DeleteHandler(product),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                });
                                            }}>
                                            <button>Delete</button>
                                            <RiDeleteBinLine className='mt-1' />
                                        </div>
                                    </div>
                                )}
                                {!user || (user && user.AccountType !== "Admin") && (

                                    <div>
                                        <button className='buyBtn' onClick={() => CartHandler(product)}>
                                            <span>Add to Cart</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    );
};

export default ProductCard;
