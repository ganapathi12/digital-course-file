import React, { useState, Component,Fragment } from 'react'
import { faFileExport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from "react-router-dom";
import { Button,Modal,Form } from "react-bootstrap";
import ReactTooltip from 'react-tooltip'


const divstyle = {
    width: '86px',
    padding: '8px',
    background: '#3a2b58'
};
const divStyle1 = {
    fontWeight: 'bold',
    color: 'black'
  };
const Assign_button = () => {
    return(
        <Fragment>
        <Button
            data-tip
            data-for='viewassignment'
            as={Link}
            className='logoutbutton'
            name='assg1'
            to={'/assignment'} 
            style = {divstyle}
        >
            <FontAwesomeIcon icon={faFileExport} />
        </Button>
                <ReactTooltip id='viewassignment' type='warning' place='bottom' effect='solid'>
                <span style={divStyle1}>View Assignments</span>
              </ReactTooltip>
        </Fragment>
  );

}

export default Assign_button;