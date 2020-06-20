import { UserDTO } from "./UserDTO";
import { ClassDTO } from "./ClassDTO";

export interface BookingDTO {
    id: string;
    bookingId: string;
    classId? : string;
    class?: ClassDTO[];
    createdAt: string;
    updatedAt: string;
    user?: UserDTO;


}