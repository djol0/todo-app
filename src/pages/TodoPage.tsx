import { useNavigate } from 'react-router-dom'
import TodoForm from "../components/TodoForm";

function TodoPage() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className='page-header'>
        <h1>Todo App</h1>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/todos')}
        >
          See all tasks
        </button>
      </div>

      <div className="card">
        <TodoForm />
      </div>
    </div>
  );
}

export default TodoPage;
