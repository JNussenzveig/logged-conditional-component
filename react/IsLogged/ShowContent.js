import React from 'react'
import classnames from './styles.css'

const ShowContent = ({
  children,
  authState
}) => {

  console.log("showing content for", authState);
  
  return (
    <div className={`${classnames.content}`}>
      {children}
    </div>
  );
}

export default ShowContent