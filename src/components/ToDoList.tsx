import { useForm } from "react-hook-form";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { categoryState, toDoSelector } from "./atom";
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
  const setCategory = useSetRecoilState(categoryState);

  const filteredToDos = useRecoilValue(toDoSelector);

  const onInput = (event: any) => {
    setCategory(event.currentTarget.value);
  };

  return (
    <Container>
      <H1>To Do Program</H1>

      <Select onInput={onInput}>
        <option value="TO_DO">TO_DO</option>
        <option value="DOING">DOING</option>
        <option value="DONE">DONE</option>
      </Select>

      <CreateToDo />

      {filteredToDos.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
