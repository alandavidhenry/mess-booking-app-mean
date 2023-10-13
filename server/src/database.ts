import * as mongodb from "mongodb";
import { User } from "./user";
import { Meal } from "./meal";
import { Room } from "./room";

export const collections: {
    users?: mongodb.Collection<User>;
    meals?: mongodb.Collection<Meal>;
    rooms?: mongodb.Collection<Room>;
 } = {};

 export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
  
    const db = client.db("mean-stack-example");
    await applySchemaValidation(db);
  
    const usersCollection = db.collection<User>("users");
    collections.users = usersCollection;
    const mealsCollection = db.collection<Meal>("meals");
    collections.meals = mealsCollection;
    const roomsCollection = db.collection<Room>("rooms");
    collections.rooms = roomsCollection;
 }

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our user model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
// Apply schema validation for 'users'
export async function applySchemaValidation(db: mongodb.Db) {
    const usersJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["serviceNumber", "rank", "firstName", "lastName", "unit", "contactNumber", "email"],
            additionalProperties: false,
            properties: {
                _id: {},
                serviceNumber: {
                    bsonType: "string",
                    description: "'serviceNumber' is required and is a string which must be eight number in length",
                    minLength: 8,
                    maxLength: 8
                },
                rank: {
                    bsonType: "string",
                    description: "'rank' is required and is a string",
                },
                firstName: {
                    bsonType: "string",
                    description: "'firstName' is required and a string",
                },
                lastName: {
                    bsonType: "string",
                    description: "'lastName' is required and a string",
                },
                unit: {
                    bsonType: "string",
                    description: "'unit' is required and a string",
                },
                contactNumber: {
                    bsonType: "string",
                    description: "'contactNumber' is required and a string",
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and a string",
                }
            },
        },
    };
    
    // Apply schema validation for 'meals'
    const mealsJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["serviceNumber", "rank", "firstName", "lastName", "unit", "contactNumber", "email"],
            additionalProperties: false,
            properties: {
                _id: {},
                mealDate: {
                    bsonType: "date",
                    description: "'date' is required and is a date",
                },
                mealType: {
                    bsonType: "array",
                    description: "'mealType' is an array of strings",
                    items: {
                        bsonType: "string",
                    }
                },
                dietaryRequirements: {
                    bsonType: "string",
                    description: "'dietaryRequirements' is a string",
                },
            },
        },
    };

    // Apply schema validation for 'rooms'
    const roomsJsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["reasonForStay", "arrivalDate", "arrivalTime", "departureDate", "departureTime"],
            additionalProperties: false,
            properties: {
                _id: {},
                reasonForStay: {
                    bsonType: "string",
                    description: "'reasonForStay' is required and is a string",
                },
                arrivalDate: {
                    bsonType: "date",
                    description: "'arrivalDate' is required and is a date",
                },
                arrivalTime: {
                    bsonType: "date",
                    description: "'arrivalTime' is required and is a date",
                },
                departureDate: {
                    bsonType: "date",
                    description: "'departureDate' is required and is a date",
                },
                departureTime: {
                    bsonType: "date",
                    description: "'departureTime' is required and is a date",
                },
                beddingRequired: {
                    bsonType: "string",
                    description: "'beddingRequired' is a string",
                },
                bringingGuests: {
                    bsonType: "string",
                    description: "'bringingGuests' is a string",
                },
                guestTitle: {
                    bsonType: "string",
                    description: "'guestTitle' is a string",
                },
                guestName: {
                    bsonType: "string",
                    description: "'guestName' is a string",
                },
                roomType: {
                    bsonType: "string",
                    description: "'roomType' is a string",
                },
                POCDetails: {
                    bsonType: "string",
                    description: "'POCDetails' is a string",
                },
                POCServiceNumber: {
                    bsonType: "string",
                    description: "'POCServiceNumber' is a string",
                },
                POCRank: {
                    bsonType: "string",
                    description: "'POCRank' is a string",
                },
                POCFirstName: {
                    bsonType: "string",
                    description: "'POCFirstName' is a string",
                },
                POCLastName: {
                    bsonType: "string",
                    description: "'POCLastName' is a string",
                },
                POCUnit: {
                    bsonType: "string",
                    description: "'POCUnit' is a string",
                },
                POCContactNumber: {
                    bsonType: "string",
                    description: "'POCContactNumber' is a string",
                },
                POCEmail: {
                    bsonType: "string",
                    description: "'POCEmail' is a string",
                },
                checkRules: {
                    bsonType: "bool",
                    description: "'checkRules' is a boolean",
                },

            },
        },
    };

    // Try applying the modification to the 'users' collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "users",
        validator: usersJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("users", {validator: usersJsonSchema});
        }
    });

    // Try applying the modification to the 'meals' collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "meals",
        validator: mealsJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("meals", {validator: mealsJsonSchema});
        }
    });

    // Try applying the modification to the 'rooms' collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "rooms",
        validator: roomsJsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("rooms", {validator: roomsJsonSchema});
        }
    });
}