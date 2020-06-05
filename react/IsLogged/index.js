import React, { useState, useEffect } from 'react'

import { ExtensionPoint } from 'vtex.render-runtime'

import axios from 'axios'

import classnames from './style.css'

const IsLogged = () => {

  const [user, setUser] = useState(null)

  const fetchUser = async () => {
    const session = (await axios({
      url: '/api/sessions?items=*',
      method: 'GET'
    })).data

    console.log("session", session);

    const profile = session.namespaces.profile
    const isLogged = profile && session.namespaces.profile.isAuthenticated.value === "true"
    console.log("isLogged", isLogged);

    if (isLogged) {
      setUser(profile)
    }
  }

  useEffect(() => {
    console.log("component mounted");
    fetchUser()
  }, [])

  if (!user) return (
    <div className={`${classnames.loggedConditionalContainer} ${classnames.loggedConditionalContainer}--logged-out`}>
      <ExtensionPoint id="IsLogged.not-logged" authState={false} />
    </div>
  )
  
  return (
    <div className={`${classnames.loggedConditionalContainer} ${classnames.loggedConditionalContainer}--logged-in`}>
      <ExtensionPoint id="IsLogged.logged" authState={true} />
    </div>
  );
}

export default IsLogged