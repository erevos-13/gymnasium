import { UserDTO } from "./UserDTO";

export interface BookingDTO {
    id: string;
    bookingId: string;
    classId: string;
    createdAt: string;
    updatedAt: string;
    user: UserDTO;


}