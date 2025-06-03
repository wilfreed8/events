import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/ui/Header";
import { AppContext } from "../../../Context/AppProvider";
import { Plus } from "lucide-react";
import WeatherInfo from "../../../components/api/weatherInfo";

interface Event {
  id: number;
  title: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  location: string;
  category:string
  max_participants: number;
  ticket_price: number;
  remaining_quota: number;
}


const events = ()=> {
  
  const {token} = useContext(AppContext)

  const [events, setEvents] = useState<Event[]>([]);
      
  useEffect(() => {
        async function getEvents() {
          try {
            const res = await fetch(`/api/Events`,{
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
            }
            );
            if (!res.ok) throw new Error("Erreur lors du fetch");
            const data = await res.json();
            setEvents(data);
          } catch (error) {
            console.error("Erreur fetch users:", error);
          }
        }
        getEvents();
      }, [events]);
  

  const handleDelete = async (id: number) => {
    await fetch(`/api/Events/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    setEvents([]);
  };

 

  return (
    <div>
      <Header title="Events"/>
    <div>
    <div className="flex flex-end justify-end m-4">
              
              <Link
              className="btn btn-success text-white"
                to="/Dashboard/events/addEvent"
              ><Plus/>add Event</Link>
            </div>
    {events.map((event) => (
    <div
  key={event.id}
  className="bg-white  border-gray-500 shadow-md rounded-2xl mx-2 p-4 flex flex-col md:flex-row justify-between items-start md:items-center my-5"
>
  {/* 📷 IMAGE ${event.category} */}
  <img
    src={`/src/assets/${event.category}.jpg`}
    alt={event.title}
    width={80}
    height={50}
    className="w-full md:w-50 md:h-30 h-40 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
  />

  {/* 📄 CONTENU TEXTE */}
  <div className="flex-1 space-y-2">
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
      <span className="flex flex-row gap-4"><p className="text-sm text-gray-600">
        🗓 {new Date(event.start_datetime).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-600">
        🗓 {new Date(event.end_datetime).toLocaleDateString()} 
      </p>
      </span>
    </div>

    <p className="text-gray-700">{event.description}</p>
    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
      <span>💰 Prix: <strong>{event.ticket_price}$</strong></span>
      <span>👥 Participants: <strong>{event.max_participants}</strong></span>
      <span>📉 Quota restants: <strong>{event.remaining_quota}</strong></span>
      <span>📉 location: <strong>{event.location.toLowerCase()}</strong></span>
      <label htmlFor="my_modal_6" className="btn">Weather</label>
{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold">{event.location}</h3>
    <WeatherInfo location={event.location.toLowerCase()} date={event.start_datetime} />
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>
    </div>
  </div>

  {/* 🎯 BOUTONS */}
  <div className="flex space-x-2 mt-4 md:mt-15 md:ml-4">
    <Link
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      to={`/Dashboard/events/updateEvent/${event.id}`}
    >
      Update
    </Link>
    <button
      onClick={() => handleDelete(event.id)}
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
export default events
