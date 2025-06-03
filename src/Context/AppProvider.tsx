import { createContext, useEffect, useState,  } from "react";
type userType ={
  "id": number,
  "name": String,
  "email": string,
  "email_verified_at": null,
  "created_at": Date,
  "updated_at": Date,
  "role": string ,
  "is_approved": number
}
    type AppContextType = {
        token: string | null;
        setToken: React.Dispatch<React.SetStateAction<string | null>>;
        user: userType|null
        setUser: React.Dispatch<React.SetStateAction<userType| null>>;

 }

export const AppContext = createContext<AppContextType>({
  token: null,
  setToken: ()=>{},
  user:null,
  setUser:()=>{}
});

export default function AppProvider({ children }:{children : React.ReactNode}) {
  const [token,setToken] = useState(localStorage.getItem('token'))
  const [user,setUser] = useState<null |userType>(null)
  async function getUser(){
    const res = await fetch("https://mylaravelapi.vercel.app/api/api/user",{
      headers:{
        Authorization:`Bearer ${token}`,},
      }
    );
    const data = await res.json();
    console.log(data)
    if(res.ok){
      setUser(data);
    }
  }

  useEffect(()=>{
    if(token) getUser();
  },[token])

    return (
    <AppContext.Provider value={{ token,setToken,user,setUser }}>
      {children}
    </AppContext.Provider>
  );

}

