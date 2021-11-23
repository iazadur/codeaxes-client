import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios'
import swal from 'sweetalert';
import { AiOutlineDelete } from 'react-icons/ai';
import './Home.css'

const Home = () => {
    const [users, setUsers] = useState([])

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const url = 'http://localhost:5000/user'
    const onSubmit = data => {
        axios.post(url, data)
            .then((res) => {
                if (res.data.insertedId) {
                    reset()
                    swal("Good job!", "deleted successfully!", "success");
                    axios.get('http://localhost:5000/user')
                        .then(res => {
                            setUsers(res.data)
                        })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/user')
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
                axios.delete(`http://localhost:5000/user/${id}`)
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

            <div className="container mx-auto">
                <div className="md:grid md:grid-cols-3 md:gap-6">

                    <div className="mt-5 md:mt-0 md:col-span-3">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center flex-col">

                            <div className="gap-6">
                                <input {...register("FirstName", { required: true })} className=" my-5 p-3 rounded-lg shadow-lg focus:outline-none focus:ring-pink-400 focus:ring-4" placeholder="First Name" />
                                {errors.FirstName?.type === 'required' && "FirstName is required"}

                                <input {...register("LastName", { required: true })} className=" my-5 p-3 rounded-lg shadow-lg focus:outline-none focus:ring-pink-400 focus:ring-4" placeholder="Last Name" />
                                {errors.LastName?.type === 'required' && "LastName is required"}
                            </div>

                            <input {...register("BirthDate", { required: true })} className="w-3/6 mx-auto my-5 p-3 rounded-lg shadow-lg focus:outline-none focus:ring-pink-400 focus:ring-4" placeholder="Date of Birth" type='date' />
                            {errors.BirthDate?.type === 'required' && "BirthDate is required"}

                            <input {...register("EmailID", { required: true })} className="w-3/6 mx-auto my-5 p-3 rounded-lg shadow-lg focus:outline-none focus:ring-pink-400 focus:ring-4" placeholder="Email" />
                            {errors.EmailID?.type === 'required' && "EmailID is required"}




                            <input {...register("ContactNumber", { required: true })} className="w-3/6 mx-auto my-5 p-3 rounded-lg shadow-lg focus:outline-none focus:ring-pink-400 focus:ring-4" placeholder="Contact Number" type="number" />



                            <input {...register("Address", { required: true })} className="w-3/6 mx-auto my-5 p-3 rounded-lg shadow-lg focus:outline-none focus:ring-pink-400 focus:ring-4" placeholder="Address" type="text" />

                            {errors.Address && <span>This field is required</span>}

                            <input type="submit" className="btn " />
                        </form>
                    </div>
                </div>
            </div>







            <div className="mt-10 sm:mt-0 container mx-auto">
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                First name
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                autoComplete="given-name"
                                                className={inputStyle}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                Last name
                                            </label>
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                autoComplete="family-name"
                                                className={inputStyle}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <input
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                className={inputStyle}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                Date Of Birth
                                            </label>
                                            <input
                                                type="date"
                                                name="city"
                                                id="city"
                                                autoComplete="address-level2"
                                                className="mt-1 focus:border-indigo-500 block w-full sm:text-sm border-gray-300   flex-col border my-5  rounded-lg shadow-sm focus:outline-none focus:ring-pink-400 focus:ring-1"
                                            />
                                        </div>

                                        

                                        <div className="col-span-6">
                                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                Street address
                                            </label>
                                            <input
                                                type="text"
                                                name="street-address"
                                                id="street-address"
                                                autoComplete="street-address"
                                                className={inputStyle}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                autoComplete="address-level2"
                                                className={inputStyle}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                                State / Province
                                            </label>
                                            <input
                                                type="text"
                                                name="region"
                                                id="region"
                                                autoComplete="address-level1"
                                                className={inputStyle}
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                                ZIP / Postal code
                                            </label>
                                            <input
                                                type="text"
                                                name="postal-code"
                                                id="postal-code"
                                                autoComplete="postal-code"
                                                className={inputStyle}
                                            />
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
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.Title}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {user.btnColor}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.Price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.Price}</td>
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