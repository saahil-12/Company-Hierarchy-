import './App.css';
import Landing from "./landingpage";
import Signup from "./signup";
import Tree from "./hierarchy"
// import CreateNewUSer from './createNewUser'
import Dashboard from './dashboard';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateUser from './createUser';

const router = createBrowserRouter([
  {
    path:"/",
    element:<Landing/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },{
    path:"/hierarchy",
    element:<Tree/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:'/createuser',
    element:<CreateUser/>
  }
]);


function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
