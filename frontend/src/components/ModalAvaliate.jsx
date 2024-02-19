import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import axios from "axios";

const ModalAvaliate = ({ open, handleClose, nome, id, token }) => {
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [avaliate, setAvaliate] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/games/avaliate/${id}`,
        { avaliate, comentario },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setTimeout(() => {
          handleClose(); // Fecha o modal após 3 segundos
        }, 2000);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-avaliate-title"
      aria-describedby="modal-avaliate-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          border: "px solid #000",
          boxShadow: 15,
          p: 4,
        }}
      >
        <Typography id="modal-avaliate-title" variant="h6" component="h2">
          Avaliar {nome}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            width: "500px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Rating
            name="avaliate"
            value={avaliate}
            onChange={(event, newValue) => {
              setAvaliate(newValue);
            }}
          />
          <TextField
            sx={{ width: 450 }}
            margin="normal"
            required
            fullWidth
            name="comentario"
            label="comentário"
            type="text"
            id="comentario"
            value={comentario}
            onChange={(event) => setComentario(event.target.value)}
          />
          {successMessage && (
            <Alert severity="success" sx={{ width: "450px" }}>
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert severity="warning" sx={{ width: "450px" }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, width: "450px" }}
          >
            Avaliar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAvaliate;
