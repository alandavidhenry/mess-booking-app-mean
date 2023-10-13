import * as mongodb from "mongodb";
 
export interface Meal {
   _id?: mongodb.ObjectId;
   mealDate: Date;
   mealType: string[];
   dietaryRequirements: string;
}