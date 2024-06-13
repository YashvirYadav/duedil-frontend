import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

// function Company
   export const ViewExSla = () => {
    return (
        <Box 
      
        sx={{ 
            flexGrow: 1,
            width: '100%', // This will make the Box take up the full width of its parent
            justifyContent: 'center',
            marginTop: '0px',
            marginleft: '05px',
            marginBottom: '0px',
            marginRight: '0px',
            alignItems: 'center'}}>
              <Outlet />
        </Box>
    )
   }