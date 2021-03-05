import React from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
// import PrivateRoutes from "./auth/helper/PrivateRoutes"
// import Cart from "./core/Cart"
import Home from "./core/Home"
import Hero from "./user/Hero"
import Signin from "./user/Signin"
// import UserDashboard from "./user/UserDashboard"
import copyright from "./user/copyright"

const Routes=()=>{
    return(
        <BrowserRouter>
        <Switch>

            {/*Folders*/}
            <Route path = "/folder/:folderId" component ={Hero}/>

            <Route path="/" exact component={Signin}/>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/copyright" exact component={copyright}/>
            {/* <Route path="/cart" exact component={Cart}/> */}
            {/* <PrivateRoutes path="/user/dashboard" exact component={UserDashboard}/> */}
        </Switch>
        </BrowserRouter>
    );

}

export default Routes;