import {React,Fragment} from 'react';
import ReactDOM from 'react-dom';
import AddFile from '../user/AddFile';

it("Unit testing for add file", () =>{
    const fragment = document.createElement("Fragment");
    ReactDOM.render(<AddFile></AddFile>,fragment)
})

