import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { profileInfo } from 'src/services'
import AppHeaderView from './AppHeaderView'
import { setUser, showToast } from 'src/store'

const AppHeaderContainer = ({ ...rest }) => {
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(false)
  const history = useHistory()
  const locatePrivateRoomHandler = () => history.push("/profile")
  const profileData = useSelector(({user}) => user)

  useEffect(async () => {
    try {
      setLoading(true)
      const { data } = await profileInfo()
      dispatch(setUser(data))
    } catch ({ response: { data: { details } } }) {
      setLoading(false)
      dispatch(showToast({ message: details, error: true}))
    } finally {
      setLoading(false)
    }
  }, [])

  const notifications = [
    // { id: '1', title: 'title', notification: 'notification' },
    // { id: '2', title: 'title1', notification: 'notifi cati onnotificat ionnot if ic at ion' },
    // { id: '3', title: 'title2', notification: 'notification' },
    // { id: '4', title: 'title3', notification: 'notification' },
  ]

  const propsData = {
    profileData,
    isLoading,
    notifications,
    locatePrivateRoomHandler,
    ...rest
  }

  return (
    <>
      <AppHeaderView {...propsData} />
    </>
  )
}

export default AppHeaderContainer
