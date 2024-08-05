import React from 'react'
import { Route } from 'react-router-dom'
import ChannelModule from '../modules/channels/ChannelModule'
import ChannelsList from '../modules/channels/views/ChannelsList'
import NewSale from '../modules/channels/views/NewSale'
function ChannelsRoutes() {
  return [
    <Route path="channels" key='channels-module' element={<ChannelModule />}>
      <Route index key='channels-list' element={<ChannelsList />} />
      <Route path="new-sale" key='new-sale' element={<NewSale />} />
    </Route>
  ]
}

export default ChannelsRoutes