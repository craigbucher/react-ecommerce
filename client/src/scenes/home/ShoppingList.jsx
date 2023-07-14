import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";

const ShoppingList = () => {
  const dispatch = useDispatch();	// initialze redux global state to trigger actions
  const [value, setValue] = useState("all");	// value for filter function
  const items = useSelector((state) => state.cart.items);	// grab cart items from global state
  const breakPoint = useMediaQuery("(min-width:600px)");	// when screen width < 600px

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Grab all items/products from backend
  async function getItems() {
    const items = await fetch(
      // new version uses port 1337:
      "http://localhost:1337/api/items?populate=image", // syntax for strapi api to grab images for each item, as well
      { method: "GET" }
    );
    const itemsJson = await items.json(); // backend response
    dispatch(setItems(itemsJson.data)); // set in global store
  }

  // get items when page loads
  useEffect(() => {
    getItems();
    // still don't know what the comment on next line means, but 'eslint' responds to it
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      {/* Tabs for 'topRated', 'newArrivals' and 'bestSellers' */}
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value} // value set in useState
        onChange={handleChange} // handleChange from above
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}  // display if *not* mobile screen
        sx={{         // additional tab styling
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"  // using *grid* layout to display items, helps with responsiveness
        // "recommend 'grid' over 'flexbox' whenever possible"
        gridTemplateColumns="repeat(auto-fill, 300px)"  // each column is 300px; display as many as possible on screen
        justifyContent="space-around" // centers when 1 image; 'space-between' would left justify
        rowGap="20px"
        columnGap="1.33%"
      >
        {/* if value = 'all', display all items */}
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {/* if value = 'newArrivals', display newArrivals */}
        {value === "newArrivals" &&
          newArrivalsItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {/* if value = 'bestSellers', display bestSellers */}
        {value === "bestSellers" &&
          bestSellersItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {/* if value = 'topRated', display topRated */}
        {value === "topRated" &&
          topRatedItems.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;