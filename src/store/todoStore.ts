import { create } from "zustand";
import { Todo, Column } from "../types/todo";

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

interface ColumnState {
  columns: Column[];
  addColumn: (column: Column) => void;
  deleteColumn: (title: string) => void;
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
}));

export const useColumnStore = create<ColumnState>((set) => ({
  columns: [{title: 'Todo task', id: 1}],
  addColumn: (column: Column) => set((state) => ({ columns: [...state.columns, column] })),
  deleteColumn: (title: string) =>
    set((state) => ({
      columns: state.columns.filter((todo) => todo.title !== title),
    }))
}));