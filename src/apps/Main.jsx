import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import { Box ,Stack } from '@mui/material'
import Navbar from '../layouts/Navbar'
import Header from '../layouts/Header'

export default function Main() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
<Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Stack direction="row" sx={{ flexGrow: 1 }}>
        <Box sx={{ flexBasis: isCollapsed ? '50px' : '200px', flexShrink: 0 }}>
          <Navbar isCollapsed={isCollapsed} />
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
  )
}
