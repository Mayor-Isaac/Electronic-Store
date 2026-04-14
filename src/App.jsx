import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
import Layout from './Layout'
import Home from './Routes/Home'
import Profile from './Routes/Profile'
import Cart from './Routes/Cart'
import ProductListing from './Routes/ProductListing'
import CheckOut from './Routes/CheckOut'
import AI from './Routes/AI'
import Track from './Routes/Track'
import NotFound from './Routes/NotFound'
import ProductDetails from './Routes/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './Login'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
         
          <Route index element={<Login />} />
          <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Layout />}>
              <Route index element={<Home />} />
              </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  )
}

export default App
