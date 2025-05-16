import { Room } from "./rooms.model";

export interface ReservationProps {
  id: number;
  customerId: number;
  startDate: string;
  endDate: string;
  reservationStatus: string;
  totalCost: number;
  taxes: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  room: Room;
}

export interface ReservationResponse {
  roomId: number;
  reservationStatus: string; 
  startDate: string;
  endDate: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export const empyReservationResponse:ReservationResponse = {
        roomId: 0,
        reservationStatus: "",
        startDate: "",
        endDate: "",
    }
