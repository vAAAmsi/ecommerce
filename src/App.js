import logo from './logo.svg';
import './App.css';
import Table from './table';
import { Routes,Route,Link,useNavigate } from 'react-router-dom';
import Cart from './cart';


function App() {
  return (
    <div>
   <Routes>
      <Route path='/' element={<Table/>} > </Route>
      <Route path='/cart' element={<Cart/>} > </Route>
      </Routes>
    </div>
  );
}

export default App;
