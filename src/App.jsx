import React from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
import Home from './Pages/Home'
import Layout from './Layout'
import Profile from './Pages/Profile'
import Cart from './Pages/Cart'
import ProductListing from './Pages/ProductListing'
import CheckOut from './Pages/CheckOut'
import AI from './Pages/AI'
import Track from './Pages/Track'
import NotFound from './Pages/NotFound'
import ProductDetails from './Pages/ProductDetails'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="products" element={<ProductListing />} />
          <Route path="ai" element={<AI />} />
          <Route path="track" element={<Track />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
