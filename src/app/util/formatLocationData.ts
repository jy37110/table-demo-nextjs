import { LocationViewType, UserData } from '../type';

export function formatLocationData(data: UserData[]): LocationViewType[] {
  return data.map((item: UserData) => {
    const { location } = item;
    return {
      ...location,
      street: `${location.street.number} ${location.street.name}`,
      coordinates: `${location.coordinates.latitude}, ${location.coordinates.longitude}`,
      timezone: `${location.timezone.offset} - ${location.timezone.description}`,
    };
  });
}
