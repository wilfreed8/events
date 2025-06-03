import  { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { toast } from 'react-toastify';


export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserTable = () => {
  const [isloading,setIsloading] = useState<boolean>(true)
  const [users,setUser] = useState<User[]>([])
  const {token} = useContext(AppContext)
  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("/api/Dashboard",{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });
        if (!res.ok) throw new Error("Erreur lors du fetch");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Erreur fetch users:", error);
      }
    }

    getUsers();
    setIsloading(!isloading)
  }, [users]);

  const handleAccept = async (userId: number) => {
    try {
      const res = await fetch(`/api/Dashboard/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
  
      if (!res.ok) throw new Error('Échec de la validation');
      setUser([]);
      setIsloading(true);
      toast("user accepted with success");
      return [{"message" : "user accepted with success"}];

  
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };
    
  const handleDeny = async (userId: number) => {
    try {
      const res = await fetch(`/api/Dashboard/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
  
      if (!res.ok) throw new Error('Échec de la validation');
  
      // Recharger les utilisateurs (ou mettre à jour localement)

      setUser([]);
      setIsloading(true);
      toast("user deleted with success");
      return [{"message" : "user deleted with success"}];
  
    } catch (error) {
      console.error('Erreur lors de la mise à jour :', error);
    }
  };
  
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID 
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  user.role === 'Admin' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2 align-middle">
              <button className="btn btn-success" onClick={() => handleAccept(user.id)}>Accept</button>
              <button className="btn btn-error" onClick={() => handleDeny(user.id)}>Deny</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;