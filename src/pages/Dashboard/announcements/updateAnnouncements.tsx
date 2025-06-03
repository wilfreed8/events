import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../Context/AppProvider";
import Loading from "../../../components/loading";

const updateAnnouncements = () => {

const [isloading,setIsloading] = useState<boolean>(true)
  const { token } = useContext(AppContext);
  const navigate = useNavigate();
  const {id} = useParams();
  const [formData, setFormData] = useState({
    id:0,
    title: "",
    content: "",
    priority: "",
    publish_date: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
    priority: "",
    publish_date: "",
  });
          
    useEffect(() => {
          async function getAnnouncements() {
            try {
              const res = await fetch(`/api/Announcements/${id}`,{
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
              }
              );
              if (!res.ok) throw new Error("Erreur lors du fetch");
              const data = await res.json();
              setFormData(data);
              setIsloading(!isloading);
            } catch (error) {
              console.error("Erreur fetch users:", error);
            }
          }
          getAnnouncements();
        }, [id]);

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    console.log(formData);
    const res = await fetch(`/api/Announcements/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate("/Dashboard/announcements");
    }
  }
  // Send formData to API here

  return (
    <div>
            {isloading ? <Loading type={"dot"} taille={"md"} color={"blue-500"}/> : (<form
      data-theme="pastel"
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl mx-auto mt-8"
    >
      <h2 className="text-2xl  font-bold mb-6 text-center">update Event</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => 
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full px-3 py-2 input hover:outline-0 rounded"
          required
        />
        {errors.title && (
          <span className="error text-red-200">{errors.title[0]}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={(e) => {
            setFormData({ ...formData, content: e.target.value });
          }}
          className="w-full px-3 py-2 border input rounded"
          required
        ></textarea>
        {errors.content && (
          <span className="error text-red-200">{errors.content[0]}</span>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={(e) => {
            setFormData({ ...formData, priority: e.target.value });
          }}
          className="w-full px-3 py-2 border input rounded"
          required
        >
          <option value="">Select priority</option>
          <option value="concert">easy</option>
          <option value="conference">medium</option>
          <option value="conference">difficult</option>

        </select>
      </div>

      {errors.priority && (
        <span className="error text-red-200">{errors.priority[0]}</span>
      )}

      <div className="mb-4">
        <label className="block text-gray-700">Start Date & Time</label>
        <input
          type="datetime-local"
          name="publish_date"
          value={formData.publish_date}
          onChange={(e) => {
            setFormData({ ...formData, publish_date: e.target.value });
          }}
          className="w-full px-3 input py-2 border rounded"
          required
        />
      </div>
      {errors.publish_date && (
        <span className="error text-red-200">{errors.publish_date[0]}</span>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>)}
    </div>
    
  );
};

export default updateAnnouncements;
