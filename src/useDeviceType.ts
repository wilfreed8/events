import { useEffect, useState } from "react";

function getDeviceType(width: number) {
  if (width < 640) return "mobile";
  if (width >= 640 && width < 1024) return "tablet";
  return "desktop";
}

export function useDeviceType() {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      setDevice(getDeviceType(width));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
}


export  async function getCitiesByCountry(country: string): Promise<string[]> {
  try {
    const response = await fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ country }),
    });

    const data = await response.json();

    if (!data.error && Array.isArray(data.data)) {
      return data.data; // liste des villes
    } else {
      console.error("Erreur API :", data.msg);
      return [];
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des villes :", error);
    return [];
  }
}
