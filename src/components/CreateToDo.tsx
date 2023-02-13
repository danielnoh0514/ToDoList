import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "./atom";

const Input = styled.input`
  padding: 5px 15px;
  text-align: center;
  font-weight: 800;
  border-radius: 10px;
  border: 0px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  font-weight: 700;
  padding: 2px 15px;
  background-color: white;
  border: 0;
  &:hover {
    cursor: pointer;
  }
`;

function CreateToDo() {
  const [category, setCategory] = useRecoilState(categoryState);

  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const handleValid = ({ toDo }: any) => {
    setValue("toDo", "");
    setToDos((prev) => [{ text: toDo, id: Date.now(), category }, ...prev]);
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", { required: "To Do is Required" })}
        placeholder="Write a To Do..."
      ></Input>
      <Button>Submit</Button>
    </form>
  );
}

export default CreateToDo;
