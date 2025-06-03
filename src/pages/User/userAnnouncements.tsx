import  { useContext, useEffect, useState } from "react";

import { AppContext } from "../../Context/AppProvider";


interface Announcement {
    id:number,
    title: string,
    content: string,
    priority: string,
    publish_date: string
}


const userAnnouncements = ()=> {
  
  const {token} = useContext(AppContext)

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
      
  useEffect(() => {
        async function getAnnouncements() {
          try {
            const res = await fetch(`/api/allAnnouncements`,{
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
  

  

 

  return (
    <>
    <div className="md:grid-cols-2 grid">
    {announcements.map((announcement) => (
    <div
  key={announcement.id}
  className="bg-white md:grid-cols-2  border-gray-500 shadow-md rounded-2xl mx-2 p-4 flex flex-col md:flex-row justify-between items-start md:items-center my-5"
>
<div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-base-300 border">
  <div className="collapse-title font-semibold">{announcement.title}</div>
  <div className="collapse-content text-sm ">
    {announcement.content}
  </div> 
  <p className="right m-2">🗓 {new Date(announcement.publish_date).toLocaleDateString()} 
 </p>
</div>
</div>
  ))}
    </div>
  </>
  );

}
export default userAnnouncements
