import * as mongodb from "mongodb";
 
export interface User {
   _id?: mongodb.ObjectId;
   serviceNumber: string;
   rank: string;
   firstName: string;
   lastName: string;
   unit: string;
   contactNumber: string;
   email: string;
}