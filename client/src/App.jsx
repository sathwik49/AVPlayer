import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={ <Landing />} />
          <Route path='/signup' element={ <Signup />} />
          <Route path='/login' element={ <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
