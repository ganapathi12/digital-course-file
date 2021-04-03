import {React,Fragment} from 'react';
import ReactDOM from 'react-dom';
import AddFolder from '../user/AddFolder';

it("Unit testing for add folder", () =>{
    const folder = {id: '123',name:'asaasds'}

    const fragment = document.createElement("Fragment");
    ReactDOM.render(<AddFolder></AddFolder>,fragment)
})
