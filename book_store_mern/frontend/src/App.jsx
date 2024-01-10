import React from 'react'
import { Route,Routes } from 'react-router-dom'
import ShowBooks from './pages/ShowBooks'
import EditBooks from './pages/EditBooks'
import Deletebooks from './pages/Deletebooks'
import CreateBooks from './pages/CreateBooks'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBooks/>}/>
      <Route path='/books/details/:id' element={<ShowBooks/>}/>
      <Route path='/books/edit/:id' element={<EditBooks/>}/>
      <Route path='/books/delete/:id' element={<Deletebooks/>}/>
    </Routes>
  )
}

export default App