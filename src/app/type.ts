export interface LocationType {
  street: { number: number; name: string };
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: { latitude: string; longitude: string };
  timezone: { offset: string; description: string };
}

export interface UserData {
  location: LocationType;
}

export interface APIResponseType<T> {
  data: {
    results: T;
  };
}

export interface LocationViewType {
  street: string;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: string;
  timezone: string;
}
