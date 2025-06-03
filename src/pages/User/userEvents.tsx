import  { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { HandCoins, ShoppingCart } from "lucide-react";
import WeatherInfo from "../../components/api/weatherInfo";

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


const userEvents = ()=> {
  
  const {token} = useContext(AppContext)

  const [events, setEvents] = useState<Event[]>([]);
  const [eventCards, setEventCards] = useState<Event[]>([]);

  

  
  useEffect(() => {
        async function getEvents() {
          try {
            const res = await fetch(`/api/allEvents`,{
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
      
      function convertToISO(dateFr: string): string {
        const [day, month, year] = dateFr.split("/");
        return `${year}-${month}-${day}`;
      }
      
      const handleCard = (id:number) => {
        const event = events.find((e) => e.id === id);
        if(!eventCards.some((e) => e.id === id) && event)
        setEventCards([...eventCards,event]);
 }
 

  return (
    <>
    <div >
    <div className="drawer drawer-end">
  <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content not-only:">
    {/* Page content here */}
    <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary mt-5 fixed z-10 right-3"><ShoppingCart/></label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    {eventCards.map((event) => (
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
    className="w-full md:w-50 md:h-30 h-20 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
  />

  {/* 📄 CONTENU TEXTE */}
  <div className="flex-1 space-y-2">
    <div className="flex flex-col md:flex-row justify-between items-center">
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
      <span>📉 Quota restant: <strong>{event.remaining_quota}</strong></span>
      <span>📉 location: <strong>{event.location.toLowerCase()}</strong></span>
      <label htmlFor="my_modal_6" className="btn">Weather</label>
{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold">{event.location}</h3>
    <WeatherInfo location={event.location.toLowerCase()} date={convertToISO(event.start_datetime)} />
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>         
      <div className="flex gap-1">
      <button
              className="btn btn-success btn-sm text-white"
              ><HandCoins/>Buy icket</button>
              <button
              className="btn btn-error btn-sm text-white"
              >delete Event</button>
      </div>
    </div>
  </div>
</div>
  ))}
    </ul>
  </div>
  </div>
    </div>


    
    <div className="grid md:grid-cols-2 justify-end m-4">
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
    <div className="flex flex-col md:flex-row justify-between items-center">
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
      <span>📉 Quota restant: <strong>{event.remaining_quota}</strong></span>
      <span>📉 location: <strong>{event.location.toLowerCase()}</strong></span>
      <label htmlFor="my_modal_6" className="btn btn-info">Weather</label>
{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold">{event.location}</h3>
    <WeatherInfo location={event.location.toLowerCase()} date={convertToISO(event.start_datetime)} />
    <div className="modal-action">
      <label htmlFor="my_modal_6" className="btn">Close!</label>
    </div>
  </div>
</div>         
      <button
              className="btn btn-success text-white"
              ><ShoppingCart onClick={()=>handleCard(event.id)}/>add Event</button>
    </div>
  </div>
</div>
  ))}
  </div>
  </>
  );

}
export default userEvents
