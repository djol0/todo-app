import { create } from "zustand";
import { Todo, Column } from "../types/todo";

const loadTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const loadColumns = (): Column[] => {
  const storedColumns = localStorage.getItem("columns");
  return storedColumns ? JSON.parse(storedColumns) : [{ title: "Todo task", id: 1 }];
};

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  deleteColumnTodos: (columnId: number) => void;
  moveTodosToColumn: (oldColumnId: number, newColumnId: number) => void;
  moveSingleTodoToColumn: (todo: Todo, newColumnId: number) => void;
  getNextOrderId: () => number;
}

interface ColumnState {
  columns: Column[];
  addColumn: (column: Column) => void;
  deleteColumn: (id: number) => void;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: loadTodos(),
  addTodo: (todo: Todo) =>
    set((state) => {
      const updatedTodos = [...state.todos, todo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),
  toggleTodo: (id: string) =>
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),
  deleteTodo: (id: string) =>
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),
  deleteColumnTodos: (columnId: number) =>
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.columnId !== columnId);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),
  moveTodosToColumn: (oldColumnId: number, newColumnId: number) =>
    set((state) => {
      const newOrderId = get().getNextOrderId();
      const updatedTodos = state.todos.map((todo) =>
        todo.columnId === oldColumnId ? 
          { ...todo, columnId: newColumnId, displayOrder: newOrderId } 
        : 
          todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),
  moveSingleTodoToColumn: (todo: Todo, newColumnId: number) =>
    set((state) => {
      const newOrderId = get().getNextOrderId();
      const updatedTodos = state.todos.map((singleTodo) =>
        singleTodo.id === todo.id ? 
          singleTodo.columnId === newColumnId ?
            { ...singleTodo, columnId: newColumnId } 
            :
            { ...singleTodo, columnId: newColumnId, displayOrder: newOrderId } 
        : 
          singleTodo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return { todos: updatedTodos };
    }),


    getNextOrderId: () => {
      const { todos } = get(); 
      if (todos.length === 0) return 1;
      return Math.max(...todos.map((todo) => todo.displayOrder), 0) + 1;
    },


}));

export const useColumnStore = create<ColumnState>((set) => ({
  columns: loadColumns(),
  addColumn: (column: Column) =>
    set((state) => {
      const updatedColumns = [...state.columns, column];
      localStorage.setItem("columns", JSON.stringify(updatedColumns));
      return { columns: updatedColumns };
    }),
  deleteColumn: (id: number) =>
    set((state) => {
      const updatedColumns = state.columns.filter((column) => column.id !== id);
      localStorage.setItem("columns", JSON.stringify(updatedColumns));
      return { columns: updatedColumns };
    }),
}));
