import  { useContext } from 'react';
import { Bell } from 'lucide-react';
import { AppContext } from '../../Context/AppProvider';

const Header = ({ title }: { title: string }) => {
  const {user} = useContext(AppContext)
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <h1 className="text-xl font-medium text-gray-800">{title}</h1>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
          hidden
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200 w-40 md:w-64"
          />
            {/*<Search size={18} className="absolute left-3 top-2.5 text-gray-400" />*/}
        </div>
        
        <div className="relative">
          <button className="relative p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full"></span>
          </button>
        </div>
        
        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-medium">
          {user?.name.substring(0,2)  }
        </div>
      </div>
    </header>
  );
};

export default Header;


