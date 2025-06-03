import React, {  useContext } from 'react';
import {  Users,  LogOut, FileText, NotepadTextDashed,  } from 'lucide-react';
import { Link,  useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppProvider';

const Sidebar = () => {
  const navigate = useNavigate()
  const {token,setUser,setToken}= useContext(AppContext)
  
  const handlelogout = async () =>{
    await fetch(`/api/logout`, {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    setToken(null)
    setUser(null);
    navigate('/Home')
  }
  return (
    <div className="w-[120px] md:w-[200px] bg-gray-800 text-white flex flex-col h-sreen transition-all duration-300">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-lg font-medium">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 py-4 ">
        <ul className=" flex-col ">
          <Link to="/Dashboard"><NavItem icon={<Users size={20} />} text="Users" /></Link>
          <Link to="/Dashboard/announcements"><NavItem icon={<FileText size={20} />} text="Announcemments" /></Link>
          <Link to="/Dashboard/events"><NavItem icon={<NotepadTextDashed size={20} />} text="Events" /></Link>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center w-full text-gray-300 hover:text-white transition-colors duration-200" >
          <LogOut size={20} className="mr-3" onClick={handlelogout} />
          <span className="hidden md:inline">Logout</span>
          </button>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

const NavItem = ({ icon, text, active }: NavItemProps) => {
  return (
    <li>
      <div 
        className={`flex items-center px-4 py-3 ${
          active 
            ? 'bg-gray-700 text-white' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        } transition-colors duration-200`}
      >
        <span className="mr-3">{icon}</span>
        <span className="hidden md:inline">{text}</span>
      </div>
    </li>
  );
};

export default Sidebar;