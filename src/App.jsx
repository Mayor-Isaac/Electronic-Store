import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
import Layout from './Layout'
import NotFound from './Routes/NotFound'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from './Login'
import Inventory from './Routes/Inventory'
import OrderCart from './Routes/OrderCart'
import CMS from './Routes/CMS'

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
         
          <Route index element={<Login />} />
          <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Layout />}>
              <Route index element={<Inventory />} />
              <Route path='inventory' element={<Inventory />} />
              <Route path='orders-cart' element={<OrderCart />} />
              <Route path='content-management' element={<CMS />} />
              </Route>
          <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  )
}

export default App
