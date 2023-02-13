import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { toDoState, IToDo, categoryState } from "./atom";
interface IFormData {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState<IToDo[]>(toDoState);
  const currentCategory = useRecoilValue(categoryState);

  const { register, handleSubmit, setValue } = useForm<IFormData>();
  const onValid = ({ toDo }: IFormData) => {
    setToDos((prev) => [
      { text: toDo, id: Date.now(), category: currentCategory },
      ...prev,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "required",
        })}
        placeholder="Write a To Do"
      />
      <button>Submit</button>
    </form>
  );
}

export default CreateToDo;
