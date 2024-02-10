import { useContext, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { icons } from "../assets";
import { BoardContext } from "../context/Board";
import { ListContext } from "../context/List";
import { TaskContext } from "../context/Task";
import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";
import TaskCard from "./TaskCard";

const TaskList = ({ taskList }) => {
  const [editMode, setEditMode] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");

  const { tasks: allTasks, dispatchTaskAction } = useContext(TaskContext);
  const { dispatchListAction } = useContext(ListContext);
  const { dispatchBoardAction } = useContext(BoardContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const newTaskId = Date.now() + "";

    dispatchTaskAction({
      type: "CREATE_TASK",
      payload: {
        id: newTaskId,
        title: taskTitle,
        listId: taskList.id,
        boardId: taskList.boardId,
      },
    });

    dispatchListAction({
      type: "ADD_TASK_ID_TO_A_LIST",
      payload: { id: taskList.id, taskId: newTaskId },
    });

    dispatchBoardAction({
      type: "ADD_TASK_ID_TO_A_BOARD",
      payload: { id: taskList.boardId, taskId: newTaskId },
    });

    setEditMode(false);
    setTaskTitle("");
  };

  const removeHandler = () => {
    dispatchListAction({ type: "REMOVE_LIST", payload: taskList.id });
    dispatchBoardAction({
      type: "REMOVE_LIST_ID_FROM_A_BOARD",
      payload: { id: taskList.boardId, listId: taskList.id },
    });
    taskList.tasks.forEach((taskId) => {
      dispatchTaskAction({ type: "REMOVE_TASK", payload: taskId });
    });
  };

  return (
    <Droppable droppableId={taskList.id}>
      {(provided) => {
        // console.log(provided, "parms from provided");
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="list-container"
          >
            <div className="list-title-container">
              <p>{taskList.title}</p>
              <img
                onClick={removeHandler}
                src={icons.crossIcon}
                alt=""
                className="add-item-icon"
              />
            </div>
            {taskList.tasks
              .map((item) => allTasks.find((ele) => ele.id === item))
              .filter((task) => task)
              .map((task, index) => (
                <TaskCard index={index} key={task.id} task={task} />
              ))}

            {!editMode ? (
              <AddItem setEditMode={setEditMode} />
            ) : (
              <AddItemForm
                title={taskTitle}
                onChangeHandler={(e) => {
                  setTaskTitle(e.target.value);
                }}
                setEditMode={setEditMode}
                submitHandler={submitHandler}
              />
            )}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default TaskList;
