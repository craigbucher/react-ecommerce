import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";	// required for the carousel component
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

// imports all images from assets folder
// he got this function from stack overflow :-)
// https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);	// replace './' in path
    return acc;
  }, {});	// start with empty array

// Also from above stackoverflow article = actual image import to 'heroTextureImports'
export const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpe?g|svg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");	// use mobile if screen width < 600px
  return (
		// More info on carousel: https://github.com/leandrowd/react-responsive-carousel
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
			// 'Previous' button:
			// (don't actually use 'hasPrev' or 'label')
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}	// = 'onClickHandler' in component library
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
					{/* 'fontSize' determines size of MUI icon: */}
          <NavigateBeforeIcon sx={{ fontSize: 40 }} /> 
        </IconButton>
      )}
			// 'Next' button:
			// (don't actually use 'hasNext' or 'label')
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
			{/* Cycle through each image */}
      {Object.values(heroTextureImports).map((texture, index) => (
        // Create a box for each image
				// React requires a unique key for each:
				<Box key={`carousel-image-${index}`}>
          <img
            src={texture}	// actual image
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "700px",
              objectFit: "cover",	// allows us to be responsive (only works w 'dead space' at sides of image)
              backgroundAttachment: "fixed",	// keeps it in place
            }}
          />
					{/* Container for text that floats in image */}
          <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.4)"	// 40% transparency
            position="absolute"
						// determined through experimentation:
            top="46%"
            left={isNonMobile ? "10%" : "0"}	// 'to keep it from position in weird spot'
            right={isNonMobile ? undefined : "0"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
          >
						{/* Sets typography the same for all images: */}
						{/* Could make different, but would have to do this separately */}
						{/* for each image */}
            <Typography color={shades.secondary[200]}>-- NEW ITEMS</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;