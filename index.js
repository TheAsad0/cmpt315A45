import express from "express";
import connectDB from "./database.js";
import Monster from "./models/monster.model.js";

const app = express();
const port =  3000;

// Database connection
connectDB();

// Middleware for JSON request parsing
app.use(express.json());

// Default route
app.get("/", function (request, response) {
    response.send("Welcome to The Monsters Directory!");
});

// CRUD Operations
// List all monsters
app.get('/monsters', async( req, res) => {
    try{
        const monsters = await Monster.find();
        res.json(monsters);
    } catch (error) {
        res.status(500).send(error.message);
    }
}); 

// Get a single monster by ID
app.get('/monsters/:id', async (req, res) => {
    try {
      const monster = await Monster.findOne({ id: req.params.id });
      if (!monster) {
        return res.status(404).json({ message: 'Monster not found' });
      }
      res.json(monster);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Create a new monster
app.post('/monsters', async (req, res) => {
    try {
        const monster = new Monster(req.body);
        await monster.save();
        res.status(201).json(monster);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an existing monster's details
app.put('/monsters/:id', async (req, res) => {
    try {
      const updatedMonster = await Monster.findOneAndUpdate(
        { id: req.params.id },
        req.body,
        { new: true }
      );
      if (!updatedMonster) {
        return res.status(404).json({ message: 'Monster not found' });
      }
      res.json(updatedMonster);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

// Remove a monster from the database
app.delete('/monsters/:id', async (req, res) => {
    try {
      const monster = await Monster.findOneAndDelete({ id: req.params.id });
      if (!monster) {
        return res.status(404).json({ message: 'Monster not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});


// Server listening
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});