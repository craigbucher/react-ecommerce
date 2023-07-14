import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {	// item = object from strapi backend
	// Where does 'width' come from ?????
  const navigate = useNavigate();
  const dispatch = useDispatch();	// initialize redux global store
  const [count, setCount] = useState(1);	// *local* state = number of items to add to cart
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },	// grab color from MUI theme
  } = useTheme();

  const { category, price, name, image } = item.attributes;	// destructure these elements form 'item' returned from backend
  const {
    data: {
      attributes: {
        formats: {
          medium: { url },	// url for medium-sized image
        },
      },
    },
  } = image;	// destructure these elements from the image

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={item.name}
          width="300px"
          height="400px"
          // new version uses port 1337:
          src={`http://localhost:1337${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer" }}	// inline style, not a MUI component
        />
        <Box
          display={isHovered ? "block" : "none"}	// if hovered, display + and - buttons
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
					{/* add and remove items: */}
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
								{/* setCount(Math.max(count - 1, 1)) = ensure count doesn't go below 1 */}
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
						{/* ADD TO CART BUTTON */}
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));	// ...item = 'item' object that we already have (with many other properties)
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
					// re-format the category - replace and capitalize the first letter:
            .replace(/([A-Z])/g, " $1")	
            .replace(/^./, (str) => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold">${price}</Typography>
      </Box>
    </Box>
  );
};

export default Item;