import { React , useState } from "react";
import { Button,Modal,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { database } from '../fire.js'
import firebase from 'firebase'
import { ROOT_FOLDER } from '../hooks/useFolder'
export default function Deffolders( {currentFolder} ){
  function openModel(){
    if(currentFolder == null) return;
            const path =  [...currentFolder.path];
            if(currentFolder !== ROOT_FOLDER){
              path.push( { name : currentFolder.name , id : currentFolder.id} )
          }
              database.folders.add({
                  name : "Program Outcomes",
                  parentId : currentFolder.id,
                  userId: firebase.auth().currentUser.uid,
                  path : path,
                  createdAt : database.getTime()
              })
              database.folders.add({
                  name : "Course Outcomes",
                  parentId : currentFolder.id,
                  userId: firebase.auth().currentUser.uid,
                  path : path,
                  createdAt : database.getTime()
              })
              database.folders.add({
                name : "Past Papers",
                parentId : currentFolder.id,
                userId: firebase.auth().currentUser.uid,
                path : path,
                createdAt : database.getTime()
            })
              database.folders.add({
                name : "Continous Assesment",
                parentId : currentFolder.id,
                userId: firebase.auth().currentUser.uid,
                path : path,
                createdAt : database.getTime()
            })
            database.folders.add({
              name : "Attendance",
              parentId : currentFolder.id,
              userId: firebase.auth().currentUser.uid,
              path : path,
              createdAt : database.getTime()
          })
          database.folders.add({
            name : "P1 materials",
            parentId : currentFolder.id,
            userId: firebase.auth().currentUser.uid,
            path : path,
            createdAt : database.getTime()
        })
        database.folders.add({
          name : "P2 materials",
          parentId : currentFolder.id,
          userId: firebase.auth().currentUser.uid,
          path : path,
          createdAt : database.getTime()
      })
      database.folders.add({
        name : "EndSem materials",
        parentId : currentFolder.id,
        userId: firebase.auth().currentUser.uid,
        path : path,
        createdAt : database.getTime()
    })
    }
  return (
    <>
      <Button style={{maxWidth : "80px"}} onClick={openModel} variant="primary" size="lg">
        <FontAwesomeIcon icon={faBolt} />
      </Button>
    </>
  );
}