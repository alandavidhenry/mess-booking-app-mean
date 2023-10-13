import * as mongodb from "mongodb";
 
export interface Room {
   _id?: mongodb.ObjectId;
   reasonForStay?: string;
   arrivalDate?: Date;
   arrivalTime?: Date;
   departureDate?: Date;
   departureTime?: Date;
   beddingRequired: string;
   bringingGuests: string;
   guestTitle?: string;
   guestName?: string;
   roomType: string;
   POCDetails?: string;
   POCServiceNumber?: string;
   POCRank?: string;
   POCFirstName?: string;
   POCLastName?: string;
   POCUnit?: string;
   POCContactNumber?: string;
   POCEmail?: string;
   checkRules: boolean;
}