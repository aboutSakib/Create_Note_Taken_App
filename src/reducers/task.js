export const taskReducer = (tasks = [], action) => {
  switch (action.type) {
    case "CREATE_TASK": {
      const newTask = {
        id: Date.now() + "",
        title: action.payload.title,
        listId: action.payload.listId,
        boardId: action.payload.boardId,
      };

      return [...tasks, newTask];
    }

    case "UPDATE_TASK_TITLE": {
      return tasks.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, title: action.payload.title };
        }

        return item;
      });
    }

    case "CHANGE_LIST_ID_OF_A_TASK": {
      return tasks.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, listId: action.payload.listId };
        }

        return item;
      });
    }

    case "CHANGE_BOARD_ID_OF_A_TASK": {
      return tasks.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, boardId: action.payload.boardId };
        }

        return item;
      });
    }
    case "REMOVE_TASK": {
      return tasks.filter((item) => item.id !== action.payload);
    }

    default: {
      return tasks;
    }
  }
};
