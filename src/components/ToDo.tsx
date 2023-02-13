import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, categoryState, toDoState } from "./atom";

const List = styled.li`
  list-style-type: none;
`;

const Button = styled.button`
  font-weight: 700;
  padding: 1px 6px;
  background-color: white;
  border: 0;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Span = styled.span`
  font-weight: 800;
  font-size: 23px;
`;

function ToDo({ text, category, id }: IToDo) {
  const [toDo, setToDos] = useRecoilState(toDoState);
  const setCategory = useSetRecoilState(categoryState);

  const onClick = (event: any) => {
    const minji = event.currentTarget.name;
    setToDos((prev) => {
      const currentIndex = prev.findIndex((p) => p.id === id);
      const newToDo = { text, id, category: minji as any };
      return [
        ...prev.slice(0, currentIndex),
        newToDo,
        ...prev.slice(currentIndex + 1),
      ];
    });
  };

  const onDelete = (event: any) => {
    console.log("value", id);
    console.log("toDo", toDo);
    setToDos((prev) => {
      const currentIndex = prev.findIndex((value) => value.id === id);
      console.log(currentIndex);
      return [...prev.slice(0, currentIndex), ...prev.slice(currentIndex + 1)];
    });
  };

  return (
    <List key={id}>
      <Span>{text}</Span>
      {category !== "TO_DO" && (
        <Button onClick={onClick} name="TO_DO">
          TO_DO
        </Button>
      )}
      {category !== "DOING" && (
        <Button onClick={onClick} name="DOING">
          DOING
        </Button>
      )}
      {category !== "DONE" && (
        <Button onClick={onClick} name="DONE">
          DONE
        </Button>
      )}
      <Button onClick={onDelete}>❌</Button>
    </List>
  );
}

export default ToDo;
