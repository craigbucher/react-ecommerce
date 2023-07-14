import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import {
    PersonOutline,
    ShoppingBagOutlined,
    MenuOutlined,
    SearchOutlined,
  } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";

const Navbar = () => {
	const navigate = useNavigate();
  const dispatch = useDispatch();	// initialize redux
  const cart = useSelector((state) => state.cart.cart); // = 'cart' item in 'cart' slice

  return (
		// MUI allows you to pass in CSS properties in the <Box> tag
		// but this is *only* possible with <Box>, otherwise must use
		// 'sx' tag
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"	// one-off (slight transparency), so not using theme colors
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"	// so is on top
    >
			{/* Navbar is two boxes at opposite sides of the screen */}
			{/* Left side = site name/link to home page */}
			{/* Right side = toolbar */}
      <Box
        width="80%"	// 80% of screen width
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"	// vertically aligned within navbar
      >
				{/* Left side: */}
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" } }}	// using 'sx' to add pseudo-class 'hover'
          color={shades.secondary[500]}
        >
          ECOMMERCE
        </Box>
				{/* Right side = 4 icons: */}
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"	// MUI: 20px between icons
          zIndex="2"
        >
          <IconButton sx={{ color: "black" }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: "black" }}>
            <PersonOutline />
          </IconButton>
          {/* <Badge> is a modification to the icon, in this case will display number of items in cart */}
          <Badge
            badgeContent={cart.length}  // number of items in cart
            color="secondary"
            invisible={cart.length === 0} // don't display if cart is empty
            sx={{
              "& .MuiBadge-badge": {  // styling specific to this badge
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))} // 'setIsCartOpen' doesn't have an action, so we don't have to pass it anything
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>  
          <IconButton sx={{ color: "black" }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;