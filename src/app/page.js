"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

export default function Home() {
  const [currentView, setCurrentView] = useState("registration");

  const toggleView = () => {
    setCurrentView((prevView) =>
      prevView === "registration" ? "userList" : "registration"
    );
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='p-8 rounded shadow-md'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-semibold'>
            {currentView === "registration" ? "Registration" : "User List"}
          </h2>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md'
            onClick={toggleView}
          >
            {currentView === "registration"
              ? "Switch to User List"
              : "Switch to Registration"}
          </button>
        </div>
        {currentView === "registration" ? <Registration /> : <UserList />}
      </div>
    </div>
  );
}

const Registration = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    year: "",
    color: "#FFFFFF",
    pantone_value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleColorChange = (color) => {
    setFormData({
      ...formData,
      color: color.hex,
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

  const validYears = Array.from(
    { length: 50 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className='bg-white p-8 rounded shadow-md'>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='id'
            className='block text-sm font-medium text-gray-700'
          >
            ID
          </label>
          <input
            type='number'
            className='mt-1 p-2 border rounded-md w-full'
            id='id'
            name='id'
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name
          </label>
          <input
            type='text'
            className='mt-1 p-2 border rounded-md w-full'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='year'
            className='block text-sm font-medium text-gray-700'
          >
            Year
          </label>
          <select
            className='mt-1 p-2 border rounded-md w-full'
            id='year'
            name='year'
            value={formData.year}
            onChange={handleChange}
            required
          >
            <option value=''>Select a Year</option>
            {validYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-4'>
          <label
            htmlFor='color'
            className='block text-sm font-medium text-gray-700'
          >
            Color
          </label>
          <SketchPicker color={formData.color} onChange={handleColorChange} />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='pantone_value'
            className='block text-sm font-medium text-gray-700'
          >
            Pantone Value
          </label>
          <input
            type='text'
            className='mt-1 p-2 border rounded-md w-full'
            id='pantone_value'
            name='pantone_value'
            value={formData.pantone_value}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md w-full'
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
