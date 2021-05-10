import { react,Fragment } from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ROOT_FOLDER } from '../hooks/useAssignment'

export default function Assg_nav({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER]
  
  
  const divStyle = {
    maxWidth: '200px',
    marginLeft: '-5px',
    fontSize: '20px'
  }

  if (currentFolder) {
    path.push(currentFolder)
  }

  // console.log(path)
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
            to: folder.id ? `/assignment/${folder.id}` : '/assignment',
          }}
          className='text-truncate d-inline-block'
          style={divStyle}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
    </Fragment>
  )
}