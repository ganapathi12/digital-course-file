import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {React, useState }from "react"
import { storage } from '../fire.js'
import Axios from 'axios';
import fileDownload from 'js-file-download';
import { Button,Modal,Form} from 'react-bootstrap';
import { useContextMenu, Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export default function File({ file }) {
  const [showit, setShowit] = useState(false);
  const MENU_ID = "#asvdsdv/asqrca662";
  const [fname,setFname] = useState(file.name);
  const [uploaddetail,setuploadDetail] = useState("");

    const { show } = useContextMenu({
        id: MENU_ID,
      });

      function closeModal(){
        setShowit(false);
    }
      function displayMenu(e) {
        show(e, { props: { id: Number(e.currentTarget.id), fileURL : file.url, fileName : file.name, showit : showit , details : file.createdAt} });
      }
    
      function handleItemClick({ event, props,file}) {

        switch (event.currentTarget.id) {

          case "download":
            // Getting download url of the file and converting it as data to blob using axios and then downloading it
            var httpsReference = storage.refFromURL(props.fileURL);
            httpsReference.getDownloadURL()
            .then((url) => {
              Axios.get(url, {
                responseType: 'blob',
              }).then(res => {
                fileDownload(res.data, props.fileName);
              });
            })
            .catch((error) => {
              console.log("ERROR");
            });
            break;

          case "details":
              setShowit(true);
              setFname(props.fileName);
              setuploadDetail(Date((props.details).toMillis()));
            break;

          case "delete":
            break;
        }
      }

  return (

    <div id='root'>
    <a
      onContextMenu={displayMenu}
      href={file.url}
      target="_blank"
      className="btn btn-outline-dark text-truncate w-100"
    >
      <FontAwesomeIcon icon={faFile} className="mr-2" />
      {file.name}
    </a>

        {/* CONTEXT MENU FOR FILE */}
        <Menu id={MENU_ID}>
            <Item id="download" onClick={handleItemClick}>
              Download
            </Item>
            <Item id="details" onClick={handleItemClick}>
              Details
            </Item>
            <Item id="delete" onClick={handleItemClick}>
              Delete
            </Item>
        </Menu>

        {/* FOR SHOWING DETAILS OF THE FILE */}
         <Modal show={showit} onHide={closeModal}>
            <Modal.Body>
                <p>File  :  {fname}</p>
                <p>Uploaded On : {(""+uploaddetail).substring(0,34)+"(IST)"}</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>
                  Close
                </Button>
              </Modal.Footer>
          </Modal>


    </div>

  )
}
