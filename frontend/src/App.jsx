import {BrowserRouter, Routes, Route} from "react-router-dom";
import SelectPaymentType from "./pages/SelectPaymentType";
import Khalti from "./pages/Khalti";
import {Provider} from "react-redux"
import store from "./store/store"
import Sucess from "./pages/PaymentSuccess"
function App() {

  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SelectPaymentType/>}/>
      <Route path="/khalti" element={<Khalti/>}/>
      <Route path="/success" element={<Sucess/>}/>
    </Routes>
    </BrowserRouter>
    
      
    </Provider>
  )
}

export default App
