import { useOutletContext } from "react-router-dom";
import MentionsChart from "../../components/chart/MentionsChart";
interface OutletContext {
    sidebarOpen: boolean;
}
const Dashboard = () => {
    const { sidebarOpen }: OutletContext = useOutletContext();

    return (
        <div className="bg-white rounded-2xl p-6 w-full overflow-hidden">
            <h2 className="mb-6 font-semibold">
                Top 10 Mentions by Facebook Pages
            </h2>
            <MentionsChart sidebarOpen={sidebarOpen} />
        </div>
    );
};

export default Dashboard;
