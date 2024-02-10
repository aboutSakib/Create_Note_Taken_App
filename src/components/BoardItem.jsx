import { useContext } from "react";
import { icons } from "../assets";
import { BoardContext } from "../context/Board";
import { ListContext } from "../context/List";
import { TaskContext } from "../context/Task";

const BoardItem = ({ board }) => {
  const { dispatchBoardAction } = useContext(BoardContext);
  const { dispatchListAction } = useContext(ListContext);
  const { dispatchTaskAction } = useContext(TaskContext);

  const removeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatchBoardAction({ type: "REMOVE_BOARD", payload: board.id });
    board.lists.forEach((listId) => {
      dispatchListAction({ type: "REMOVE_LIST", payload: listId });
    });
    board.tasks.forEach((taskId) => {
      dispatchTaskAction({ type: "REMOVE_TASK", payload: taskId });
    });
  };

  return (
    <div className="board-box d-flex flex-direction-column">
      <div className="d-flex justify-content-between">
        <h5>{board.title}</h5>
        <img
          src={icons.crossIcon}
          alt=""
          className="add-item-icon"
          onClick={removeHandler}
        />
      </div>
    </div>
  );
};

export default BoardItem;
