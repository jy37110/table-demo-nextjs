'use client';
import { useEffect, useState } from 'react';
import { getLocations } from './api/getLocations';
import { formatLocationData } from './util/formatLocationData';
import { LocationViewType } from './type';
import LocationTable from './components/LocationTable';

export default function Home() {
  const [data, setData] = useState<LocationViewType[]>([]);
  const [appIsLoading, setAppIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchLocation = async () => {
      const apiData = await getLocations();
      const locationData = formatLocationData(apiData ?? []);
      setData(locationData);
    };
    fetchLocation()
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setAppIsLoading(false);
      });
  }, []);

  if (appIsLoading) {
    return <h2>App is loading data</h2>;
  }
  return <LocationTable dataSet={data} />;
}
