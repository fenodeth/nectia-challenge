import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../services/login.js";
import { useForm } from "react-hook-form";
import { schema } from "./validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";

const Login = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    await login(data, authContext)
      .then(() => {
        navigate("/maintainer");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div>
          <TextField
            margin="normal"
            id="username"
            label="Username"
            {...register("username")}
            error={errors.username ? true : false}
            helperText={errors.username?.message}
          />
        </div>
        <div>
          <TextField
            margin="normal"
            id="password"
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password ? true : false}
            helperText={errors.password?.message}
          />
        </div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
