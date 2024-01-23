import React from 'react';
import Box from '@mui/material/Box';

const VerticalLayout: React.FC = () => {
  return (
    <Box component="div" display="flex" flexDirection="column">
      {/* Content 1 */}
      <Box component="div">
        {/* Your content goes here */}
        <p>Content 1</p>
      </Box>

      {/* Content 2 */}
      <Box component="div">
        {/* Your content goes here */}
        <p>Content 2</p>
      </Box>

      {/* Content 3 */}
      <Box component="div">
        {/* Your content goes here */}
        <p>Content 3</p>
      </Box>
    </Box>
  );
};

export default VerticalLayout;
