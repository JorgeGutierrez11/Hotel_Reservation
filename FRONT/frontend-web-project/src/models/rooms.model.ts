export interface Room {
  id: number;
  imageUrl: string;
  roomNumber: string;
  roomType: string;
  pricePerNight: number;
  capacity: number;
  taxRate: number;
  roomStatus: string;
  description: string;
  policies: string[];
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

export const amenityIcons: {[key: string]:string} = {
  "Acceso a balcón": "🌇",
  "Aire acondicionado": "❄️",
  "Armario o ropero": "👚",
  "Baño compartido": "🚻",
  "Baño privado": "🚽",
  "Desayuno incluido": "🥐",
  "Escritorio para trabajar": "💼",
  "Insonorización": "🔇",
  "Minibar": "🍾",
  "Servicio de limpieza": "🧹",
  "Televisión": "📺",
  "Toallas incluidas": "🧻",
  "Wifi gratuito": "📶"
};
