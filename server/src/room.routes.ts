import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const roomRouter = express.Router();
roomRouter.use(express.json());
 
// GET /rooms
roomRouter.get("/", async (_req, res) => {
   try {
       const rooms = await collections.rooms.find({}).toArray();
       res.status(200).send(rooms);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

//GET /rooms/:id
roomRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const room = await collections.rooms.findOne(query);
  
        if (room) {
            res.status(200).send(room);
        } else {
            res.status(404).send(`Failed to find an room: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an room: ID ${req?.params?.id}`);
    }
});

// POST /rooms
roomRouter.post("/", async (req, res) => {
try {
    const room = req.body;
    const result = await collections.rooms.insertOne(room);

    if (result.acknowledged) {
        res.status(201).send(`Created a new room: ID ${result.insertedId}.`);
    } else {
        res.status(500).send("Failed to create a new room.");
    }
} catch (error) {
    console.error(error);
    res.status(400).send(error.message);
}
});

// PUT /rooms/:id
roomRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const room = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.rooms.updateOne(query, { $set: room });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an room: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an room: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an room: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE /rooms/:id
roomRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.rooms.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an room: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an room: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an room: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});