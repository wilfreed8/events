import  { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/ui/Header";
import { AppContext } from "../../../Context/AppProvider";

import { Plus } from "lucide-react";

interface Announcement {
    id:number,
    title: string,
    content: string,
    priority: string,
    publish_date: string
}


const announcements = ()=> {
  const {token} = useContext(AppContext) 

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
      
  useEffect(() => {
        async function getAnnouncements() {
          try {
            const res = await fetch(`/api/Announcements`,{
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
            }
            );
            if (!res.ok) throw new Error("Erreur lors du fetch");
            const data = await res.json();
            setAnnouncements(data);
          } catch (error) {
            console.error("Erreur fetch users:", error);
          }
        }
        getAnnouncements();
      }, [announcements]);
  

  const handleDelete = async (id: number) => {
    await fetch(`/api/Announcements/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    setAnnouncements([]);
  };

 

  return (
    <div>
      <Header title="Announcements"/>
    <div>
    <div className="flex flex-end justify-end m-4">
              
              <Link
              className="btn btn-success text-white"
                to="/Dashboard/announcements/addAnnouncements"
              ><Plus/>add </Link>
            </div>
    {announcements.map((announcement) => (
    <div
  key={announcement.id}
  className="bg-white  border-gray-500 shadow-md rounded-2xl mx-2 p-4 flex flex-col md:flex-row justify-between items-start md:items-center my-5"
>
<div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border">
  <div className="collapse-title font-semibold">{announcement.title}</div>
  <div className="collapse-content text-sm ">
    {announcement.content}
  </div> 
  <p className="right m-2">🗓 {new Date(announcement.publish_date).toLocaleDateString()} 
 </p>
  
</div>
  
  {/* 🎯 BOUTONS */}
  <div className="flex space-x-2 mt-4 md:mt-15 md:ml-4">
    <Link
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      to={`/Dashboard/announcements/updateAnnouncements/${announcement.id}`}
    >
      Update
    </Link>
    <button
      onClick={() => handleDelete(announcement.id)}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Delete
    </button>
  </div>
</div>
  ))}
  </div>
  </div>
  );

}
export default announcements
