import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  setFieldValue,
}) => {
  return (
    <Box m="30px auto">
      {/* BILLING FORM */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Billing Information
        </Typography>
        <AddressForm	// created as a separate component so don't have to write same code twice
          type="billingAddress"
          values={values.billingAddress}	// billing address values
          touched={touched}	// whether user has entered the field
          errors={errors}	// error text provided in validation schema, otherwise is empty string
          handleBlur={handleBlur}	// what happens when you leave the field
          handleChange={handleChange}	// changes the form value as the user is typing
        />
      </Box>

			{/* Checkbox for 'same as shipping address */}
      <Box mb="20px">
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() =>
                setFieldValue(	// when checkbox is clicked:
                  "shippingAddress.isSameAddress",	
                  !values.shippingAddress.isSameAddress	// change to opposite value
                )
              }
            />
          }
          label="Same for Shipping Address"
        />
      </Box>

      {/* SHIPPING FORM */}
      {!values.shippingAddress.isSameAddress && (	// checkbox is *not* checked
        <Box>
          <Typography sx={{ mb: "15px" }} fontSize="18px">
            Shipping Information
          </Typography>
          <AddressForm
            type="shippingAddress"
            values={values.shippingAddress}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Shipping;