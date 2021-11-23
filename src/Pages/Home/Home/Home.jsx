import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import swal from 'sweetalert';
import { AiOutlineDelete } from 'react-icons/ai';
import './Home.css'

const Home = () => {
    const [users, setUsers] = useState([])

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const url = 'https://ancient-wave-86522.herokuapp.com/user'
    const onSubmit = data => {
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
        if (validateEmail(data.EmailID)) {
            axios.post(url, data)
                .then((res) => {
                    if (res.data.insertedId) {
                        reset()
                        swal("Good job!", "Successfully Add a User!", "success");
                        axios.get('https://ancient-wave-86522.herokuapp.com/user')
                            .then(res => {
                                setUsers(res.data)
                            })
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            swal("Oh Shit!", "Enter a valid email address!", "warning");
            return 
        }

    };

    useEffect(() => {
        axios.get('https://ancient-wave-86522.herokuapp.com/user')
            .then(res => {
                setUsers(res.data)
            })
    }, [])

    const handleDelete = (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Order!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(() => {
                axios.delete(`https://ancient-wave-86522.herokuapp.com/user/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            swal("Good job!", "deleted successfully!", "success");
                            const remainingUsers = users.filter(user => user._id !== id);
                            setUsers(remainingUsers);
                        }
                    })
            })
    }

    const inputStyle = "mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300   flex-col border my-5 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-pink-400 focus:ring-1"

    return (
        <>


            <div className="btn  flex justify-center"><h1 className="py-4 text-2xl font-bold">Register A User</h1></div>







            <div className="mt-10 sm:mt-0 container mx-auto">
                <div className="md:grid md:grid-cols-2 md:gap-6">

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                First name
                                            </label>
                                            <input
                                                {...register("FirstName", { required: true, minLength: 2 })}
                                                autoComplete="given-name"
                                                className={inputStyle}
                                            />
                                            {errors.FirstName?.type === 'minLength' && errorMessage("minLength is 2")}
                                            {errors.FirstName?.type === 'required' && errorMessage("FirstName is required")}

                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Last name
                                            </label>
                                            <input
                                                {...register("LastName", { required: true, minLength: 2 })}
                                                autoComplete="family-name"
                                                className={inputStyle}
                                            />
                                            {errors.LastName?.type === 'required' && errorMessage("LastName is required")}
                                            {errors.LastName?.type === 'minLength' && errorMessage("minLength is 2")}
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <input
                                                type="email"
                                                {...register("EmailID", { required: true })}
                                                className={inputStyle}
                                            />
                                            {errors.EmailID?.type === 'required' && "EmailID is required"}
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                Date Of Birth
                                            </label>
                                            <input
                                                type="date"
                                                {...register("BirthDate", { required: true })}
                                                autoComplete="address-level2"
                                                className="mt-1 focus:border-indigo-500 p-3 w-full sm:text-sm border-gray-300   flex border my-5  rounded-lg shadow-sm focus:outline-none focus:ring-pink-400 focus:ring-1"
                                            />
                                            {errors.BirthDate?.type === 'required' && "BirthDate is required"}
                                        </div>



                                        <div className="col-span-6">
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                Street address
                                            </label>
                                            <input
                                                {...register("Address", { required: true })}
                                                autoComplete="street-address"
                                                className={inputStyle}
                                            />
                                            {errors.Address && <span>This field is required</span>}
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                City
                                            </label>
                                            <input
                                                {...register("City", { required: true })}
                                                autoComplete="address-level2"
                                                className={inputStyle}
                                            />
                                        </div>



                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                                ZIP / Postal code
                                            </label>
                                            <input
                                                {...register("ZipCode", { required: true })}
                                                autoComplete="postal-code"
                                                className={inputStyle}
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="Phone number" className="block text-sm font-medium text-gray-700">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="number"
                                                {...register("ContactNumber", { required: true,minLength:10 })}
                                                autoComplete="phone number"
                                                className={inputStyle}
                                            />
                                            {errors.ContactNumber?.type === 'minLength' && errorMessage("minimum used 10th number")}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className="btn"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>






            <div className="btn flex my-10 justify-center"><h1 className="py-3 text-xl font-bold">All Users</h1></div>

            <div className="flex flex-col m-10">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            BirthDate
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            ContactNumber
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full" src={user.Image} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{user.FirstName}{" "}{user.LastName}</div>
                                                        <div className="text-sm text-gray-500">{user.EmailID}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {user.BirthDate}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.ContactNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.Address}-{user.ZipCode}{" "}{user.City}</td>
                                            <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">


                                                <AiOutlineDelete onClick={() => handleDelete(user._id)} className="text-red-600 cursor-pointer font-extrabold text-2xl hover:text-red-900 ml-3" />


                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
















        </>
    );
};

export default Home;



const errorMessage = (params) => {
    return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded bg-red-100 text-red-800">
            {params}
        </span>
    )
}