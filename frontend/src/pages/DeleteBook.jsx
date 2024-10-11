import React, { useState } from 'react'
import BackButton from '../components/BackButton';
import spinner from '../components/spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams()

  const handleDeletebook = () => {
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false)
        navigate('/');

      }).catch((error) => {
        setLoading(false);
        alert('An error happend. Please Check console');
        console.log(error);
      })
  }
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'> Delete Books</h1>
      {loading ? <spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'> Are You Sure Want Delete this book? </h3>
        
        <button className='bg-cyan-400 text-white mt-8 w-max p-5 rounded-full hover:bg-cyan-600' onClick={handleDeletebook}>
          Yes, Delete It
        </button>
      </div>
    </div>
  )
}

export default DeleteBook