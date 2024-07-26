import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Main() {
  return (
    <div><Outlet/></div>
  //   <Box>
  //   <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
  //   <Stack direction="row">
  //   <Navbar isCollapsed={isCollapsed} />
  //     <Outlet />
  //   </Stack>
  // </Box>
  )
}
