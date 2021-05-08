import { useState,useReducer, useEffect } from "react";
import { database } from '../fire.js'
import firebase from 'firebase'
import Loader from "react-loader-spinner";

export const ROOT_FOLDER = {name: 'Assignments', id : null};

export function useAssignment( folderId = null, folder= null) {


    const ACTIONS = {
        SELECT_FOLDER : 'select-folder',
        UPDATE_FOLDER : 'update-folder',
        SET_CHILD_FOLDERS : 'set_child_folders',
        SET_CHILD_FILES: "set-child-files",
    }

    function reducer( state, { type,payload } ){
        
        switch(type){
            case ACTIONS.SELECT_FOLDER:
                return{
                    folderId : payload.folderId,
                    folder : payload.folder,
                    childFiles : [],
                    childFolders : [],
                };

            case ACTIONS.UPDATE_FOLDER:
                return{
                    ...state,
                    folder : payload.folder,
                };

             case ACTIONS.SET_CHILD_FOLDERS:
                return{
                    ...state,
                    childFolders : payload.childFolders,
                }; 
            case ACTIONS.SET_CHILD_FILES:
                return {
                    ...state,
                    childFiles: payload.childFiles,
                };    

            default:
                return state;

        }

    }
    const[state,dispatch] = useReducer( reducer,{
        folderId,
        folder,
        childFolders : [],
        childFiles : []
        } 
    );

    useEffect( () => {
        dispatch({ type : ACTIONS.SELECT_FOLDER, payload : { folderId,folder }})
    } ,[folderId,folder])


    useEffect( ()=> {
        if(folderId==null){
            return dispatch({
                type:  ACTIONS.UPDATE_FOLDER,
                payload: {folder : ROOT_FOLDER},              
            })
        }
        database.a_folders.doc(folderId).get()
        .then(doc => {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload : {folder: database.formatDoc(doc)}
            })
        })
        .catch( ()=> {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload : {folder: ROOT_FOLDER}
            })
        }) 

        return state;
    },[folderId])

    
    useEffect( () => {
        if (!firebase.auth().currentUser) {
        return <><div className='centered'><Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      /></div></>
    }

    return database.a_folders
            .where("userId","==", firebase.auth().currentUser.uid)
            .where("parentId", "==" ,folderId)
            .orderBy("createdAt")
            .onSnapshot(snapshot => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FOLDERS,
                    payload : { childFolders : snapshot.docs.map(database.formatDoc) }
                })
            // console.log(snapshot.docs.map(database.formatDoc))
            })
    },[folderId])

    // console.log(folderId)
    useEffect(() => {
        if(firebase.auth().currentUser)
        {
                return (
          database.a_files
            .where("folderId", "==", folderId)
            .onSnapshot(snapshot => {
              dispatch({
                type: ACTIONS.SET_CHILD_FILES,
                payload: { childFiles: snapshot.docs.map(database.formatDoc) },
              })
            })
        )
        }
      }, [folderId])

    return state;
}
