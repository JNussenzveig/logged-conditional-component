import React from 'react'

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