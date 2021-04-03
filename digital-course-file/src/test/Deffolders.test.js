import {React,Fragment} from 'react';
import ReactDOM from 'react-dom';
import Deffolders from '../user/Deffolders';

it("Unit testing for Default folders", () =>{
    const fragment = document.createElement("Fragment");
    ReactDOM.render(<Deffolders></Deffolders>,fragment)
})

