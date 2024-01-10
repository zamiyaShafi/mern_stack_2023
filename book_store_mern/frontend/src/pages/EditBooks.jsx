import React from 'react'
import Spinner from '../components/Spinner'
import BackButtons from '../components/BackButtons'
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


function EditBooks() {
  const [title,setTitle]=useState("")
  const [author,setAuthor]=useState("")
  const [publishYear,setPublishYear]=useState("")
  const [loading,setLoading]=useState(false)
  const {id}=useParams()
  const navigate=useNavigate()

  useEffect(()=>{
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`).then((res)=>{
      console.log(res.data)
      setTitle(res.data.title)
      setAuthor(res.data.author)
      setPublishYear(res.data.publishYear)
      setLoading(false)
      
      

    }).catch((err)=>{
      console.log(err)
      alert("An error occured see in console")
      setLoading(false)
   

    })

  },[])

  const handleEditBook=()=>{
    const data={
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios.put(`http://localhost:5555/books/${id}`,data).then((res)=>{
      console.log(res)
      setLoading(false)
      navigate("/")

    }).catch((err)=>{
      alert("An error occured please see the console")
      console.log(err)
      setLoading(false)

    })

  }

  return (
    <div className='p-4'>
    <BackButtons/>
    <h1 className='text-3xl my-4'>Edit Book</h1>
    {loading?(<Spinner/>):("")}
    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
      <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Title</label>
        <input
        type='text'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        className='text-xl mr-4 text-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
<label className='text-xl mr-4 text-gray-500'>Author</label>
        <input
        type="text"
        value={author}
        onChange={(e)=>setAuthor(e.target.value)}
        className='text-xl mr-4 text-gray-500 px-4 py-2 w-full'/>
        </div>
        <div className='my-4'>
<label className='text-xl mr-4 text-gray-500'>Publish Year</label>
        <input
        type="text"
        value={publishYear}
        onChange={(e)=>setPublishYear(e.target.value)} />
        </div>
       <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
        Save

       </button>




   

    </div>
  </div>
  )
}

export default EditBooks