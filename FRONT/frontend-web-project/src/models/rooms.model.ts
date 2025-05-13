export interface Room {
  id: number;
  roomNumber: string;
  roomType: string;
  pricePerNight: number;
  capacity: number;
  taxRate: number;
  roomStatus: string;
  description: string;
  policies?: string;
  amenity: RoomAmenity[];
}

export interface RoomAmenity {
  id: number;
  name: string;
}

export interface RoomFilter {
  capacities: number[];
  roomTypes: string[];
  amenities: string[];
}

export const emptyRoomFilter: RoomFilter = {
  capacities: [],
  roomTypes: [],
  amenities: []
};

export interface RoomFilterResponse {
  capacitiesResponse: number;
  roomTypesResponse: string;
  amenitiesResponse: number[];
}

export const emptyRoomFilterResponse: RoomFilterResponse = {
  capacitiesResponse: 0,
  roomTypesResponse: '',
  amenitiesResponse: []
};