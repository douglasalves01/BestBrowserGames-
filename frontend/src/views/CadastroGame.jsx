import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import NavBar from "../components/NavBar";
import FormGame from "../components/FormGame";

const CadastroGame = ({ token }) => {
  return (
    <>
      <NavBar />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, pt: 5, pl: 35, pr: 5 }}>
          <FormGame token={token} />
        </Box>
      </Box>
    </>
  );
};
export default CadastroGame;
