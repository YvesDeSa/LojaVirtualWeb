import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./Home"
import Products from "./Products"
import NotFound from "./NotFound"
import Orders from "./Orders"
import OrderDetails from "./OrderDetails"
import Users from "./Users"
import Categories from "./Categories"

const App = () => {
 
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/orders/:id" element={<OrderDetails/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/categories" element={<Categories/>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}
export default App