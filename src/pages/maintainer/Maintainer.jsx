import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { schema } from "./validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, Typography } from "@mui/material";
import DataTable from "./components/Table";
import { AuthContext } from "../../context/AuthContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../services/maintainer";

const dummyData = [
  { id: 1, name: "Task 1", description: "Desc 1" },
  { id: 2, name: "Task 2", description: "Desc 2" },
  { id: 3, name: "Task 3", description: "Desc 3" },
];

const Maintainer = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchData = async () => {
    try {
      const response = await getTasks(token);
      setData(dummyData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async (entry) => {
    if (getValues("id")) {
      try {
        const updatedData = data.map((item) => {
          if (item.id === getValues("id")) {
            return {
              ...item,
              name: getValues("name"),
              description: getValues("description"),
            };
          }
          return item;
        });
        await updateTask(updatedData, token);
        setData(updatedData);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const newData = {
          id: data[data.length - 1].id + 1,
          name: entry.name,
          description: entry.description,
        };
        await createTask(newData, token);
        setData([...data, newData]);
      } catch (error) {
        console.error(error);
      }
    }
    reset();
    setShowForm(false);
  };

  const editData = (item) => {
    reset(item);
    setShowForm(true);
  };

  const deleteData = async (id) => {
    try {
      await deleteTask(id, token);
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Tasks Maintainer
      </Typography>
      {!showForm ? (
        <Button variant="contained" onClick={() => setShowForm(true)}>
          Create
        </Button>
      ) : (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <TextField
            margin="normal"
            id="name"
            label="Name"
            {...register("name")}
            error={errors.name ? true : false}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            id="description"
            label="Description"
            {...register("description")}
            error={errors.description ? true : false}
            helperText={errors.description?.message}
            style={{ marginLeft: "10px" }}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ marginLeft: "10px", marginTop: "25px" }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setShowForm(false)}
            style={{ marginLeft: "10px", marginTop: "25px" }}
          >
            Cancel
          </Button>
        </form>
      )}
      <DataTable data={data} editData={editData} deleteData={deleteData} />
    </div>
  );
};

export default Maintainer;
