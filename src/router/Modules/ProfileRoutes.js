import React from "react";
import { Route } from "react-router-dom";
import ProfileModule from "../../modules/profile/ProfileModule";
import ProfileView from "../../modules/profile/views/ProfileView";
import ProfileSettings from "../../modules/profile/views/ProfileSettings";

export default function ProfileRoutes() {
  return [
    <Route path="profile" key="profile" element={<ProfileModule />}>
      <Route index key="profile-view" element={<ProfileView />} />
      <Route
        path="settings"
        key="profile-settings"
        element={<ProfileSettings />}
      />
    </Route>,
  ];
}
