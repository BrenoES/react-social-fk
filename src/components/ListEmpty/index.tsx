import { Box, Typography } from "@material-ui/core";

export default function ListEmpty({ message }: any) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography>{message}</Typography>
      </Box>
    );
  }