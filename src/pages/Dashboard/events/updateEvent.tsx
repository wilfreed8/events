import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../../Context/AppProvider';
import { getCitiesByCountry } from '../../../useDeviceType';

 const  updateEvent = () =>{

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
    is_active:boolean;
  }
  const {token} = useContext(AppContext)
  const navigate = useNavigate()
   const {id} = useParams()
  const [formData, setFormData] = useState<Event>({
    id:0,
    title: '',
    description: '',
    category: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
    max_participants: 0,
    ticket_price: 0,
    is_active: false,
    remaining_quota: 0
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    category: '',
    start_datetime: '',
    end_datetime: '',
    location: '',
    max_participants: '',
    ticket_price: '',
    is_active: false,
   });

   //get the event according to the id
   useEffect(() => {
    async function getEvents() {
      try {
        const res = await fetch(`/api/Events/${id}`,{
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        }
        );
        if (!res.ok) throw new Error("Erreur lors du fetch");
        const data = await res.json();
        setFormData(data);
        console.log(formData);
      } catch (error) {
        console.error("Erreur fetch users:", error);
      }
    }
    getEvents();
  }, [id]);
         

  async function handleSubmit (e: { preventDefault: () => void; })  {
    e.preventDefault();
    const res = await fetch(`/api/Events/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/Dashboard/events");
      }
    }
    // Send formData to API here
  const[cities,setCities]=useState<string[]>([])
      useEffect(() => {
        async function loadCities() {
          const Cities = await getCitiesByCountry("Turkey");
          setCities(Cities)
          console.log(cities); // ["Paris", "Lyon", "Marseille", ...]
        }
      
        loadCities();
      }, []);


  return (
    <form data-theme="pastel"
    onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto mt-8"
    >
      <h2 className="text-2xl  font-bold mb-6 text-center">Update Event</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(a)=>
            setFormData({...formData,title: a.target.value})
          }
          className="w-full px-3 py-2 input hover:outline-0 rounded"
          required
        />
         {errors.title && (
              <span className="error text-red-200">{errors.title[0]}</span>
            )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(a)=>{
            setFormData({...formData,description:a.target.value})
          }}
          className="w-full px-3 py-2 border input rounded"
          required
        ></textarea>
         {errors.description && (
              <span className="error text-red-200">{errors.description[0]}</span>
            )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={(e)=>{
            setFormData({...formData,category:e.target.value})
          }}
          className="w-full px-3 py-2 border input rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="concert">Concert</option>
          <option value="conference">Conference</option>
          <option value="sport">Sport</option>
          <option value="workshop">Workshop</option>
        </select>
      </div>

      {errors.description && (
              <span className="error text-red-200">{errors.description[0]}</span>
            )}

      <div className="mb-4">
        <label className="block text-gray-700">Start Date & Time</label>
        <input
          type="datetime-local"
          name="start_datetime"
          onChange={(e)=>{
            setFormData({...formData,start_datetime:e.target.value})
          }}
          className="w-full px-3 input py-2 border rounded"
          required
        />
      </div>
      {errors.start_datetime && (
              <span className="error text-red-200">{errors.start_datetime[0]}</span>
            )}

      <div className="mb-4">
        <label className="block text-gray-700">End Date & Time</label>
        <input
          type="datetime-local"
          name="end_datetime"
          onChange={(e)=>{
            setFormData({...formData,end_datetime:e.target.value})
          }}
          className="w-full px-3 input py-2 border rounded"
          required
        />
      </div>
      {errors.end_datetime && (
              <span className="error text-red-200">{errors.end_datetime[0]}</span>
            )}

<div className="mb-4">
        <label className="block text-gray-700">Location</label>
        <select
        className=' select'
  onChange={(e) => {
    setFormData({ ...formData, location: e.target.value })
  }}  
>  
  {cities.map((city) => (
    <option key={city} value={city}>{city}</option>
  ))}
</select>
      </div>
      {errors.location && (
              <span className="error text-red-200">{errors.location[0]}</span>
            )}

      <div className="mb-4">
        <label className="block text-gray-700">Max Participants</label>
        <input
          type="number"
          name="max_participants"
          min="1"
          value={formData.max_participants}
          onChange={(e)=>{
            setFormData({...formData,max_participants:parseInt(e.target.value)})
          }}
          className="w-full px-3 input py-2 border rounded"
          required
        />
      </div>
      {errors.max_participants && (
              <span className="error text-red-200">{errors.max_participants[0]}</span>
            )}

      <div className="mb-4">
        <label className="block text-gray-700">Ticket Price</label>
        <input
          type="number"
          name="ticket_price"
          min="0"
          step="0.01"
          value={formData.ticket_price}
          onChange={(e)=>{
            setFormData({...formData,ticket_price:parseInt(e.target.value)})
          }}
          className="w-full px-3  py-2 input border rounded"
          required
        />
      </div>
      {errors.ticket_price && (
              <span className="error text-red-200">{errors.ticket_price[0]}</span>
            )}

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={()=>{
                setFormData({...formData,is_active:!formData.is_active})
              }}
            className="mr-2"
          />
          Activate Event
        </label>
      </div>
      {errors.is_active && (
              <span className="error text-red-200">{errors.is_active}</span>
            )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default updateEvent

