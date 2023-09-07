"use client";
import Image from "next/image";
import "./style.css"
import { useState, useEffect } from "react";

export default function Home() {
  const [currentView, setCurrentView] = useState("registration");

  const toggleView = () => {
    setCurrentView((prevView) =>
      prevView === "registration" ? "userList" : "registration"
    );
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 rounded shadow-md bg-white">
        <div className="relative mb-4">
          <h2 className="text-2xl font-semibold">
            {currentView === "registration" ? "Registration" : "User List"}
          </h2>
          <div className="slider-switch">
            <button
              className={`slider-btn ${currentView === "registration" ? "active" : ""}`}
              onClick={toggleView}
            ></button>
          </div>
        </div>
        {currentView === "registration" ? <Registration /> : <UserList />}
      </div>
    </div>
  );
}

const Registration = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='bg-white p-8 rounded shadow-md'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            className='mt-1 p-2 border rounded-md w-full'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <input
            type='password'
            className='mt-1 p-2 border rounded-md w-full'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md'
        >
          Register
        </button>
      </form>
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://reqres.in/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className='overflow-x-auto'>
        <table className='min-w-full border rounded-lg overflow-hidden'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>First Name</th>
              <th className='px-4 py-2'>Last Name</th>
              <th className='px-4 py-2'>Email</th>
              <th className='px-4 py-2'>Avatar</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {users.map((user) => (
              <tr key={user.id}>
                <td className='border px-4 py-2'>{user.id}</td>
                <td className='border px-4 py-2'>{user.first_name}</td>
                <td className='border px-4 py-2'>{user.last_name}</td>
                <td className='border px-4 py-2'>{user.email}</td>
                <td className='border px-4 py-2'>
                  <Image
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}'s Avatar`}
                    className='w-10 h-10 rounded-full'
                    width={800}
                    height={500}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
