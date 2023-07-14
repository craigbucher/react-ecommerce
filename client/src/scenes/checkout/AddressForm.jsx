import { getIn } from "formik";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddressForm = ({
  type,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");	// use mobile if screen width < 600px

  // these functions allow for better code readability
  const formattedName = (field) => `${type}.${field}`;	// type = 'billingAddress' or 'shippingAddres'

  const formattedError = (field) =>
    Boolean(
			// will only show error if both of these are true:
			// any time nesting an object in formik, have to use 'getIn'
			// "when using formik, try to avoid nesting objects"
      getIn(touched, formattedName(field)) &&	// check if formattedName of field is touched
        getIn(errors, formattedName(field))	// check if formattedName of field has error
    );

	// this is the actual textual error (not boolean like above)
  const formattedHelper = (field) =>
    getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <Box
      display="grid"	// grid allows for better responsiveness
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"	// repeat 4 times, split into 4 fractions with minimum of 0 & maximum of 1 fraction (25%)
      sx={{
				// target child div:
				// if mobile, each element will have span of 4 so will be on its own line:
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName}
        name={formattedName("firstName")}	// formattedName from above
        error={formattedError("firstName")}	// formattedError from above
        helperText={formattedHelper("firstName")}	// formattedHelper from above
        sx={{ gridColumn: "span 2" }}	// use 2 columns (of 4) for nonMobile
      />
      <TextField
        fullWidth
        type="text"
        label="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName}
        name={formattedName("lastName")}
        error={formattedError("lastName")}
        helperText={formattedHelper("lastName")}
        sx={{ gridColumn: "span 2" }}	// use 2 columns (of 4) for nonMobile
      />
      <TextField
        fullWidth
        type="text"
        label="Country"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.country}
        name={formattedName("country")}
        error={formattedError("country")}
        helperText={formattedHelper("country")}
        sx={{ gridColumn: "span 4" }}	// use all 4 columns for nonMobile
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street1}
        name={formattedName("street1")}
        error={formattedError("street1")}
        helperText={formattedHelper("street1")}
        sx={{ gridColumn: "span 2" }}	// use 2 columns (of 4) for nonMobile
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address 2 (optional)"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.street2}
        name={formattedName("street2")}
        error={formattedError("street2")}
        helperText={formattedHelper("street2")}
        sx={{ gridColumn: "span 2" }}	// use 2 columns (of 4) for nonMobile
      />
      <TextField
        fullWidth
        type="text"
        label="City"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.city}
        name={formattedName("city")}
        error={formattedError("city")}
        helperText={formattedHelper("city")}
        sx={{ gridColumn: "span 2" }}	// use 2 columns (of 4) for nonMobile
      />
      <TextField
        fullWidth
        type="text"
        label="State"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.state}
        name={formattedName("state")}
        error={formattedError("state")}
        helperText={formattedHelper("state")}
        sx={{ gridColumn: "1fr" }}	// basically a span of 1 column
      />
      <TextField
        fullWidth
        type="text"
        label="Zip Code"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.zipCode}
        name={formattedName("zipCode")}
        error={formattedError("zipCode")}
        helperText={formattedHelper("zipCode")}
        sx={{ gridColumn: "1fr" }}	// basically a span of 1 column
      />
    </Box>
  );
};

export default AddressForm;