import React from 'react'

const ShowContent = ({
  children,
  authState
}) => {

  console.log("showing content for", authState);
  
  return (
    <div className='w-100'>
      {children}
    </div>
  );
}

export default ShowContent