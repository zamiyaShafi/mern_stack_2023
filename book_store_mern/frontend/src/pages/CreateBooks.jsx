import React from 'react'
import BackButtons from '../components/BackButtons'
import Spinner from '../components/Spinner'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateBooks() {
  const [title,setTitle]=useState("")
  const [author,setAuthor]=useState("")
  const [publishYear,setPublishYear]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()

  const handleSaveBook=()=>{
    const data={
      title,
      author,
      publishYear
    }
    setLoading(true)
    axios.post("http://localhost:5555/books",data).then(()=>{
      setLoading(false)
      console.log("Success")
      navigate("/")

    }).catch((err)=>{
      setLoading(false)
      alert("An error occured, please check the console")
      console.log(err.message)

    })


  }
  return (
    <div className='p-4'>
      <BackButtons/>
      <h1 className='text-3xl my-4'>Create Class</h1>
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
         <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save

         </button>




     

      </div>
    </div>
  )
}

export default CreateBooks