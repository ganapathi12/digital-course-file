import {React,Fragment} from 'react';
import ReactDOM from 'react-dom';
import File from '../user/File';

it("Unit testing for File", () =>{
    const file = {name:'afgfvf'}
    const fragment = document.createElement("Fragment");
    ReactDOM.render(<File file={file}></File>,fragment)
})

