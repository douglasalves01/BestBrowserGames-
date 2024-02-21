import CategoriaTable from "../components/CategoriaTable";
import NavBar from "../components/NavBar";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
const ContentCategoria = ({ token }) => {
  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 15,
            pl: 35,
            pr: 5,
            display: "flex",
          }}
        >
          <CategoriaTable token={token} />
        </Box>
      </Box>
    </>
  );
};
export default ContentCategoria;
ContentCategoria.propTypes = {
  token: PropTypes.string.isRequired,
};
