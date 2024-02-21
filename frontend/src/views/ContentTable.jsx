import GamesTable from "../components/GamesTable";
import NavBar from "../components/NavBar";
import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
const ContentTable = ({ token }) => {
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
          <GamesTable token={token} />
        </Box>
      </Box>
    </>
  );
};
export default ContentTable;
