import { useEffect, useState } from 'react';

type LocationSelectorProps = {
  onSelect: (country: string, city: string) => void;
};

export default function LocationSelector({ onSelect }: LocationSelectorProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [loadingCities, setLoadingCities] = useState(false);

  // Charger la liste des pays au chargement
  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/positions')
      .then(res => res.json())
      .then(data => {
        const countryNames = data.data.map((item: any) => item.name);
        setCountries(countryNames.sort());
      });
  }, []);

  // Charger les villes lorsqu’un pays est sélectionné
  useEffect(() => {
    if (selectedCountry) {
      setLoadingCities(true);
      fetch('https://countriesnow.space/api/v0.1/countries/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country: selectedCountry }),
      })
        .then(res => res.json())
        .then(data => {
          setCities(data.data);
          setSelectedCity('');
        })
        .finally(() => setLoadingCities(false));
    }
  }, [selectedCountry]);

  // Notifier le parent du choix
  useEffect(() => {
    if (selectedCountry && selectedCity) {
      onSelect(selectedCountry, selectedCity);
    }
  }, [selectedCountry, selectedCity]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium">Pays</label>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">-- Sélectionnez un pays --</option>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div>
          <label className="block font-medium">Ville</label>
          {loadingCities ? (
            <p>Chargement des villes...</p>
          ) : (
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="border p-2 rounded w-full"
              required
            >
              <option value="">-- Sélectionnez une ville --</option>
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
}
