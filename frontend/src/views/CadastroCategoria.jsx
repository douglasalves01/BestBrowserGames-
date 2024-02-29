import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NavBar from '../components/NavBar';
import FormCategoria from '../components/FormCategoria';
import PropTypes from 'prop-types';

const CadastroCategoria = ({ token }) => {
  return (
    <>
      <NavBar />
      <Box sx={{ display: 'flex' }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, pt: 5, pl: 35, pr: 5 }}>
          <FormCategoria token={token} />
        </Box>
      </Box>
    </>
  );
};
CadastroCategoria.propTypes = {
  token: PropTypes.string.isRequired,
};
export default CadastroCategoria;
