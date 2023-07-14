import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import { useState } from "react";

// to allow input of email address:
const Subscribe = () => {
  const [email, setEmail] = useState("");

// *Form doesn't do anything* : just for UI mock-up purposes

  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      {/* Icon on top */}
			<IconButton>
        <MarkEmailReadOutlinedIcon fontSize="large" />
      </IconButton>
			{/* First line of text */}
      <Typography variant="h3">Subscribe To Our Newsletter</Typography>
			{/* Second line of text */}
      <Typography>
        and receive $20 coupon for your first order when you checkout
      </Typography>
			{/* Email entry box: */}
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        backgroundColor="#F2F2F2"
      >
				{/* Input field */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				{/* Placeholder for submit button */}
        <Typography sx={{ p: "10px", ":hover": { cursor: "pointer" } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Subscribe;