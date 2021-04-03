import {React,Fragment} from 'react';
import ReactDOM from 'react-dom';
import Dropzone from '../user/Dropzone';

it("Unit testing for Drag N Drop", () =>{
    const folder = {id: '1255',name: 'grefd',parentId:'nmhsd'}
    const fragment = document.createElement("Fragment");
    ReactDOM.render(<Dropzone currentFolder={folder}></Dropzone>,fragment)
})

