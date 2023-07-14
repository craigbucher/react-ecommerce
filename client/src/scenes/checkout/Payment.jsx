import { Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

// values, touched, errors, handleBlur, handleChange = required by formik
const Payment = ({ values, touched, errors, handleBlur, handleChange }) => {
  return (
    <Box m="30px 0">
			{/* margin = 30px top/bottom 0px left/right */}
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Info
        </Typography>
				{/* Email: */}
        <TextField
          fullWidth
          type="text"
          label="Email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          name="email"	// not in nested object (in Checkout.jsx), so don't have to use getIn and special formatting
          error={!!touched.email && !!errors.email}	// '!!' = converts to boolean
          helperText={touched.email && errors.email}	// error text
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}	// entire width (4 columns) on nonMobile
        />
				{/* Phone number: */}
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.phoneNumber}
          name="phoneNumber"	// not in nested object (in Checkout.jsx), so don't have to use getIn and special formatting
          error={!!touched.phoneNumber && !!errors.phoneNumber}	// '!!' = converts to boolean
          helperText={touched.phoneNumber && errors.phoneNumber}	// error text
          sx={{ gridColumn: "span 4" }}	// entire width (4 columns) on nonMobile
        />
      </Box>
    </Box>
  );
};

export default Payment;