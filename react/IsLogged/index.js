import React, { useState, useEffect, useLayoutEffect } from 'react'

import { ExtensionPoint } from 'vtex.render-runtime'

import axios from 'axios'

import classnames from '../styles.css'

const IsLogged = () => {

  const [user, setUser] = useState(null)
  const [uid, setUid] = useState('')

  const fetchUser = async () => {
    const session = (await axios({
      url: '/api/sessions?items=account.id,account.accountName,store.channel,store.countryCode,store.cultureInfo,store.currencyCode,store.currencySymbol,store.admin_cultureInfo,creditControl.creditAccounts,creditControl.deadlines,creditControl.minimumInstallmentValue,authentication.storeUserId,authentication.storeUserEmail,profile.firstName,profile.document,profile.email,profile.id,profile.isAuthenticated,profile.lastName,profile.phone,public.favoritePickup,public.utm_source,public.utm_medium,public.utm_campaign,public.utmi_cp,public.utmi_p,public.utmi_pc',
      method: 'GET'
    })).data

    console.log("session", session);

    const profile = session.namespaces.profile
    const isLogged = profile && session.namespaces.profile.isAuthenticated.value === "true"
    console.log("isLogged", isLogged);

    if (isLogged) {
      setUser(profile)
      setUid(profile.email)
    }
  }

  useEffect(() => {
    console.log("component mounted");
    fetchUser()
  }, [])

  useLayoutEffect(() => {
    console.log("layout effect");
    const body = document.querySelector('body')
    if (body) {
      if (user) {
        body.classList.add('vtex-logged-in')
        body.classList.remove('vtex-logged-out')
      }

      body.classList.remove('vtex-logged-in')
      body.classList.add('vtex-logged-out')
    }
  }, [uid])

  if (!user) return (
    <div className={`${classnames.container} ${classnames.container}--logged-out`}>
      <ExtensionPoint id="IsLogged.not-logged" authState={false} />
    </div>
  )
  
  return (
    <div className={`${classnames.container} ${classnames.container}--logged-in`}>
      <ExtensionPoint id="IsLogged.logged" authState={true} />
    </div>
  );
}

export default IsLogged