require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const port = process.env.PORT || 3000;

const db = require("./config/db");
db();

app.use(express.json());

const corsOptions = {
    origin: process.env.CLIENT,
  }

app.use(cors(corsOptions))
const { Dog } = require("./models/dog");



app.get('/', (req, res) => {
    res.send("Hello this is a Dog api.");
});

app.get("/all",async(req,res)=>{
    try {
        const allDogs = await Dog.find();
        return res.status(200).send(allDogs);
    } catch (error) {
        return res.status(400).json({code:400,msg:"No Dog found."});
    }
})

app.get('/:id',async(req,res)=>{
    try {
        const dog =  await Dog.findById(req.params.id);

        return res.status(200).json(dog);
    } catch (error) {
        return res.status(400).json({msg:"dog not found"});
    }
})

app.post('/add',async(req,res)=>{
    const {name,breed,age,isGoodBoy} = req.body;

    const newDog = new Dog({ name,breed,age,isGoodBoy });
    
    try {
        const insertedDog = await newDog.save();
        return res.status(200).json(insertedDog);
    } catch (error) {
        //console.log(error.message);
        return res.status(400).json({msg:"insertion failed"});
    }
})
app.put('/update/:id',async(req,res)=>{
    try {
        const updatedDog = await Dog.findByIdAndUpdate(req.params.id,
            {
                $set:req.body
            },{
                new:true
            });

        return res.status(200).json(updatedDog);
    } catch (error) {
        return res.status(400).json({msg:"update failed"});
    }
})
app.delete('/:id',async(req,res)=>{
    try {
        await Dog.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg:"delete successfull"});
    } catch (error) {
        return res.status(400).json({msg:"delete failed"});
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});
