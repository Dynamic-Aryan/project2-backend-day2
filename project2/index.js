const express = require("express");
const { connectToMongoDB } = require("./connect.js");
const urlRoute = require("./routes/url.js");
const URL = require('./models/url.js')
const app = express();
const PORT = 8000;

connectToMongoDB('mongodb://localhost:27017/short-url')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json()); // Add this middleware to parse JSON bodies
app.use('/url', urlRoute);

app.get('/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
     shortId
    },{ $push:{
     visitHistory: {
        timestamp: Date.now(),
     }
    }

    })

res.redirect(entry.redirectURL);
})

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
