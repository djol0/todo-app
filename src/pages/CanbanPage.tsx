import { useNavigate } from 'react-router-dom'
import TodoList from "../components/TodoList";

function CanbanPage() {
    const navigate = useNavigate()

    return (
        <div className="container">
            <div className='page-header'>
                <h1>Todo App</h1>
                <button
                    className='btn btn-primary'
                    onClick={() => navigate('/')}
                >
                    Add new task
                </button>
            </div>

            <div className="card">
                <TodoList />
            </div>
        </div>
    );
}

export default CanbanPage;
