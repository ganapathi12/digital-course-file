import {React,Fragment} from 'react';
import ReactDOM from 'react-dom';
import FolderNav from '../user/FolderNav';

it("Unit testing for Folder Navigation", () =>{
    const folder1 = {id:'f32fsd132',name:'fewwee'}
    const folder2 = {id:'dsgsgr',name:'2edwg'}
    const folder = {id:'12345',name:'qwqq',path:[folder1,folder2]}
    const fragment = document.createElement("Fragment");
    //ReactDOM.render(<FolderNav currentFolder={folder}></FolderNav>,fragment)
})