import { useContext, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Link, useParams } from "react-router-dom";

import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import TaskList from "../components/TaskList";
import { BoardContext } from "../context/Board";
import { ListContext } from "../context/List";
import { TaskContext } from "../context/Task";

const BoardDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const [listTitle, setListTitle] = useState("");

  const { boardId } = useParams();

  const { dispatchBoardAction } = useContext(BoardContext);
  const { lists, dispatchListAction } = useContext(ListContext);
  const { dispatchTaskAction } = useContext(TaskContext);

  const renderedList = lists.filter((item) => item.boardId === boardId);

  const submitHandler = (e) => {
    e.preventDefault();

    const newListId = Date.now() + "";

    dispatchListAction({
      type: "CREATE_LIST",
      payload: { title: listTitle, boardId: boardId, id: newListId },
    });

    dispatchBoardAction({
      type: "ADD_LIST_ID_TO_A_BOARD",
      payload: { id: boardId, listId: newListId },
    });
    setEditMode(false);
    setListTitle("");
  };
  const dragEndHandler = (result) => {


		const { draggableId, source, destination } = result;
		console.log(draggableId);
		if (!destination) {
			return;
		}
		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		if (source.droppableId !== destination.droppableId) {
			dispatchTaskAction({
				type: "CHANGE_LIST_ID_OF_A_TASK",
				payload: {
					id: draggableId,
					listId: destination.droppableId,
				},
			});
		}

		dispatchListAction({
			type: "SORT_TASK_IDS_IN_LIST",
			payload: {
				draggableId,
				source,
				destination,
			},
		});
	};

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <div className="d-flex m-top-sm flex-direction-row">
        <Link to="/">Back to Boards</Link>
        {renderedList.map((taskList) => (
          <TaskList key={taskList.id} taskList={taskList} />
        ))}

        {!editMode ? (
          <AddItem listAddItem={true} setEditMode={setEditMode} />
        ) : (
          <AddItemForm
            title={listTitle}
            listForm={true}
            onChangeHandler={(e) => {
              setListTitle(e.target.value);
            }}
            setEditMode={setEditMode}
            submitHandler={submitHandler}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default BoardDetails;
