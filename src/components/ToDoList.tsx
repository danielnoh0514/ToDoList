import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IOption, optionState, toDoSelector } from "./atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const H1 = styled.h1`
  font-weight: 900;
  font-size: 30px;
  margin-bottom: 50px;
  margin-top: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Select = styled.select`
  padding: 2px 15px;
  font-weight: 800;
  margin-bottom: 50px;
  border-radius: 10px;
  border: 0px;
`;

function ToDoList() {
  const [category, setCategory] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm();
  const [option, setOption] = useRecoilState(optionState);

  const filteredToDos = useRecoilValue(toDoSelector);

  const onInput = (event: any) => {
    const {
      currentTarget: { value },
    } = event;
    console.log(event);

    setCategory(value);
  };
  const onValid = ({ option }: any) => {
    setValue("option", "");
    setOption((prev) => [{ option }, ...prev]);
  };
  return (
    <Container>
      <H1>To Do Program</H1>

      <Select value={category} onInput={onInput}>
        <option value="TO_DO">TO_DO</option>
        <option value="DOING">DOING</option>
        <option value="DONE">DONE</option>
        {option.map((p) => (
          <option value={p.option}>{p.option}</option>
        ))}
      </Select>

      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("option")} placeholder="New Category" />
        <button>Create New Category</button>
      </form>

      <CreateToDo />

      {filteredToDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
