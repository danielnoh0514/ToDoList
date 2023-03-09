import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, IToDo, toDoState } from "./atom";

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
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm();
  const handleValid = ({ toDo }: any) => {
    setValue("toDo", "");
    setToDos((prev) => [{ text: toDo, id: Date.now(), category }, ...prev]);
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", { required: true })}
        placeholder="Write a To Do..."
      ></Input>
      <Button>Submit</Button>
    </form>
  );
}

export default CreateToDo;
