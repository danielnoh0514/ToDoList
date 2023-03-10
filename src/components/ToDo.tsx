import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, categoryState, toDoState, optionState } from "./atom";

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
  const setToDos = useSetRecoilState(toDoState);
  const category1 = useRecoilValue(categoryState);
  const options = useRecoilValue(optionState);

  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {
    const minji = event.currentTarget.name;
    console.log("value", minji);
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

  const onDelete = () => {
    setToDos((prev) => {
      const currentIndex = prev.findIndex((value) => value.id === id);
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
      {options.map(
        (p) =>
          category1 !== p.option && (
            <Button onClick={onClick} name={p.option}>
              {p.option}
            </Button>
          )
      )}

      <Button onClick={onDelete}>❌</Button>
    </List>
  );
}

export default ToDo;
