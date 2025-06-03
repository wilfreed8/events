
import Header from "../../../components/ui/Header";
import UserTable from "../../../components/ui/UserTable";

const userDashboard = () => {

  return (
    <div className="h-full flex flex-col ">
      <Header title="Dashboard" />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">Users</h2>
          </div>

          <div className="bg-white rounded-md shadow-sm">
            <UserTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default userDashboard;
