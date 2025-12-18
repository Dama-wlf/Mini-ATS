import { useDispatch } from 'react-redux'
import { logoutUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'



function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await dispatch(logoutUser());
        navigate("/login");
    };
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogout}>Deconnexion</button>
        </div>
    )
}

export default Dashboard