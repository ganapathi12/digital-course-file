import React, { useState, Component } from 'react'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { Button,Modal,Form } from "react-bootstrap";


const divstyle = {
    width: '86px',
    padding: '8px',
    background: '#3a2b58'
};

const Assign_button = () => {
    return(
        <Button
            as={Link}
            to={'/assignment'} 
            style = {divstyle}
        >
            <FontAwesomeIcon icon={faFileExport} />
        </Button>
  );

}

export default Assign_button;