import {React,Fragment} from 'react';
import ReactDOM from 'react-dom';
import Folder from '../user/Folder';

it("Unit testing Folder", () =>{
    const folder = {id:'12123',name:'abcs'}
    const fragment = document.createElement("Fragment");
    ReactDOM.render(<Folder folder={folder}></Folder>,fragment)
})

