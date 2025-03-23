import { create } from "zustand";
import { Todo, Column } from "../types/todo";

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  deleteColumnTodos: (columnId: number) => void;
  moveTodosToColumn: (oldColumnId: number, newColumnId: number) => void;
}

interface ColumnState {
  columns: Column[];
  addColumn: (column: Column) => void;
  deleteColumn: (id: number) => void;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  addTodo: (todo: Todo) => set((state) => ({ todos: [...state.todos, todo] })),
  toggleTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  deleteTodo: (id: string) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  deleteColumnTodos: (columnId: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.columnId !== columnId),
    })),
  moveTodosToColumn: (oldColumnId: number, newColumnId: number) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.columnId === oldColumnId ? { ...todo, columnId: newColumnId } : todo
      ),
    })),
}));

export const useColumnStore = create<ColumnState>((set) => ({
  columns: [{title: 'Todo task', id: 1}],
  addColumn: (column: Column) => set((state) => ({ columns: [...state.columns, column] })),
  deleteColumn: (id: number) =>
    set((state) => ({
      columns: state.columns.filter((todo) => todo.id !== id),
    }))
}));