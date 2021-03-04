import React from 'react';
import AddFolder from "./AddFolder";
import { Container,Button } from "react-bootstrap";
import { useFolder } from ".././hooks/useFolder";
import Folder from "./Folder";
import FolderNav from "./FolderNav";
import Deffolders from "./Deffolders";
import { useParams } from "react-router-dom";

const Hero=({handleLogout})=>{

    const { folderId } = useParams();
    const {folder, childFolders} = useFolder(folderId);

    return(
        <>
        <section className="hero">
            <nav>
                <h2>Course File</h2>
                <button className="logoutbutton" onClick={handleLogout}>Logout</button>
            </nav>
        </section>

        <Container fluid>Contents</Container>
        <Container fluid>
        <div className="d-flex align-items-center">
            <FolderNav currentFolder={folder}/>
            <AddFolder currentFolder={folder}/>
            <Deffolders currentFolder={folder}/>
            </div>

            {childFolders.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFolders.map(childFolder => (
                        <div
                            key = {childFolder.id}
                            style = { {maxWidth : "250px"}}
                            className="p-2"
                        >
                            <Folder folder={childFolder}></Folder>
                        </div>
                    ))}
                </div>
            )}

        </Container>
        </>  
    );
}
export default Hero;