
import Header from "../../components/ui/Header";
import UserTable from "../../components/ui/UserTable";
import ActionButton from "../../components/ui/ActionButton";
import Sidebar from "../../components/ui/Sidebar";

const Dashboard = () => {
  
  // Mock data
  

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-full flex-1 flex-col overflow-auto ">
        <Header title="Dashboard" />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-800">Users</h2>
              <ActionButton
                onClick={() => console.log("Add user")}
                label="Add User"
              />
            </div>

            <div className="bg-white rounded-md shadow-sm">
              <UserTable  />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
