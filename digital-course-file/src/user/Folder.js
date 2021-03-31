import { React,useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useContextMenu, Menu, Item, Separator } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

export default function Folder ({folder}) {
    const history = useHistory();
    const MENU_ID = "#abcd123141asscsc!1223";

    const { show } = useContextMenu({
        id: MENU_ID,
      });

      function displayMenu(e) {
        // e.preventDefault();
        show(e, { props: { id: Number(e.currentTarget.id) , folderId : folder.id} });
      }
    
      function handleItemClick({ event, props, data, triggerEvent}) {
        // console.log(props.folderId);
        switch (event.currentTarget.id) {
          case "open":
            history.push(`/folder/${props.folderId}`);
            break;

          case "rename":
            break;

          case "details":
            break;

        }
      }
    

    return (
        <div>
        <Button 
            onContextMenu={displayMenu}
            id={folder.id}
            to={`/folder/${folder.id}`} 
            variant="outline-secondary" 
            className="text-truncate w-100" 
            as={Link}>
            <FontAwesomeIcon icon={faFolder} className="mr-2"/>
            {folder.name}
        </Button>

        <Menu id={MENU_ID}>
            <Item id="open" onClick={handleItemClick} >
              Open
            </Item>
            <Item id="rename" onClick={handleItemClick}>
              Rename
            </Item>
            <Item id="details" onClick={handleItemClick}>
              Details
            </Item>
        </Menu>

        </div>
    );

}
