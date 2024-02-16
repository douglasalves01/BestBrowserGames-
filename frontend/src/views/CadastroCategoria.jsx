import Sidenav from "../components/Sidenav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const CadastroCategoria = () => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography paragraph>Cadastro de Categoria</Typography>
        </Box>
      </Box>
    </>
  );
};
export default CadastroCategoria;
