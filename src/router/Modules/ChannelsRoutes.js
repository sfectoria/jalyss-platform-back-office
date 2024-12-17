import React from "react";
import { Route } from "react-router-dom";
import ChannelModule from "../../modules/channels/ChannelModule";
import ChannelsList from "../../modules/channels/views/ChannelsList";
import NewSale from "../../modules/channels/views/NewSale";
import AddChannel from "../../modules/channels/views/AddChannel";
import ChannelDetails from "../../modules/channels/views/ChannelDetails";
import ChannelHistoryDetails from "../../modules/channels/component/ChannelHistoryDetails";
import UnarchivedListChannel from "../../modules/channels/views/UnarchivedListChannel";

function ChannelsRoutes() {
  return [
    <Route path="channels" key="channels-module" element={<ChannelModule />}>
      <Route index key="channels-list" element={<ChannelsList />} />
      <Route index path="Archived" element={<UnarchivedListChannel />} />
      <Route path="add-channel" element={<AddChannel />} />
      <Route
        key="details"
        path="channel-details/:id"
        element={<ChannelDetails />}
      />
      <Route
        key="channel-history-details"
        path="/channels/channel-details/:id/history"
        element={<ChannelHistoryDetails />}
      />
      <Route path="new-sale" key="new-sale" element={<NewSale />} />
    </Route>,
  ];
}

export default ChannelsRoutes;
