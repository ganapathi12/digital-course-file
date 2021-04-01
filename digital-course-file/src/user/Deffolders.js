import { React , useState } from "react";
import { Button,Modal,Form} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { database } from '../fire.js'
import firebase from 'firebase'
import { ROOT_FOLDER } from '../hooks/useFolder'
export default function Deffolders( {currentFolder} ){
  function createdef(){
    if(currentFolder == null) return;
            const path =  [...currentFolder.path];
            if(currentFolder !== ROOT_FOLDER){
              path.push( { name : currentFolder.name , id : currentFolder.id} )
          }
          const parents =  [...currentFolder.parents];
          if(currentFolder!== ROOT_FOLDER){
              parents.push(currentFolder.id)
          }
          var deffolderlist=["Program Outcomes","Course Outcomes","Continous Assesment","Attendance","P1 materials","P2 materials","EndSem materials","Past Papers"];
          for (var i in deffolderlist){
              database.folders.add({
              name : deffolderlist[i],
              parentId : currentFolder.id,
              userId: firebase.auth().currentUser.uid,
              path : path,
              createdAt : database.getTime(),
              parents : parents,              
          });
        }
      }
  return (
    <>
      <Button name='special_folders' style={{maxWidth : "80px"}} className="mr-2" onClick={createdef} variant="primary" size="sm">
        <FontAwesomeIcon icon={faBolt} />
      </Button>
    </>
  );
}
