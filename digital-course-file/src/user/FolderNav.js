import { react, Fragment } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../hooks/useFolder'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

export default function FolderNav({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
  const divStyle1 = {
    maxWidth: '200px',
    marginLeft: '20px',
    fontSize: '20px'
  }
  const divStyle2 = {
    maxWidth: '175px',
    fontSize: '20px'
  }
  if (currentFolder) {
    path = [...path, ...currentFolder.path]
  }

  return (
    <Fragment>
      
        <Breadcrumb
          className='flex-grow-1'
          listProps={{ className: 'bg-white pl-0 m-0' }}
        >
          {path.map((folder, index) => (
            <Breadcrumb.Item
              key={folder.id}
              linkAs={Link}
              linkProps={{
                to: folder.id ? `/folder/${folder.id}` : '/',
              }}
              className='text-truncate d-inline-block'
              style={ divStyle1 }
            >
              {folder.name}
            </Breadcrumb.Item>
          ))}
          {currentFolder && (
            <Breadcrumb.Item
              className='text-truncate d-inline-block'
              style={ divStyle2 }
              active
            >
              {currentFolder.name}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      
    </Fragment>
  )
}
