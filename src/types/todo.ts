export interface Todo {
  id: string;
  title: string;
  columnId: number;
  description: string;
  dueDate?: string;
  completed: boolean;
  createdAt: Date;
} 

export interface Column {
  id: number;
  title: string;
}