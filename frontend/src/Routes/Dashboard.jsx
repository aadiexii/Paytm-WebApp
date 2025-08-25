import Appbar from "../components/Appbar.jsx"
import Balance from "../components/Balance.jsx"
import Users from "../components/Users.jsx"

const Dashboard = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={"10,000"} />
            <Users />
        </div>
    </div>
}

export default Dashboard
