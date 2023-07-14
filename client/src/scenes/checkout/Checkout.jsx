import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js"; // payment processing

// initialize stripe
const stripePromise = loadStripe(
  "pk_test_51NTcFcICOetyqrT4RIer3Ca7uQAFWOntL8KBROfZi1AVKJlBue0vIVbSM72B714qIKGRfMEdSrI2slQL5JZDCB2N00gExATNXV"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);  // which step of the process we're on
  const cart = useSelector((state) => state.cart.cart); // retrieve cart from global state
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  // triggered once form is fully submitted:
  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress, // copy all values from billingAddress to same values in BillingAddress
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      makePayment(values);
    }

    actions.setTouched({}); // reset validation every time we go to next step
  };

  async function makePayment(values) {
    const stripe = await stripePromise; // from function, above
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({  // map though items in cart
        id,
        count,  // return a new array of id & count for each item
      })),
    };

    // user orders model in strapi:
    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),  // requestBody from above
    });
    const session = await response.json();  // response from backend formatted to JSON
    await stripe.redirectToCheckout({
      sessionId: session.id,  // sessionId from backend and redirect to confirmation page
    });
  }

  return (
    <Box width="80%" m="100px auto">
      {/* Stepper is MUI's process/step tracking component */}
      {/* In this case, we'll have 2 steps: Billing and Payment */}
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        {/* margin = 20px top/bottom 0px left/right */}
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        {/* "I prefer formik when using MUI" */}
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]} // schema to validate changes based on step
        >
          {({
            // formik stuff:
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* if on first step: */}
              {isFirstStep && (
                <Shipping           // Shipping form
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {/* if on second step: */}
              {isSecondStep && (
                <Payment             // Payment form
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {/* BUTTONS: */}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (  // = if second step (why this syntax?)
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px", // 15px top/bottom 40px left/right
                    }}
                    onClick={() => setActiveStep(activeStep - 1)} // go to previous step
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit" // so, when clicked, will run formik's handleFormSubmit function
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px", // 15px top/bottom 40px left/right
                  }}
                >
                  {/* if on first step, button text is 'Next' */}
                  {/* if on second step, button text is 'Place Order' */}
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,  // only difference from billingAddress
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  // stepper first step:
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"), // 'required("required")' = text displayed when doesn't validate
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", { // only validate when address is different
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  // stepper second step:
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;