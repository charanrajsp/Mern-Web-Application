const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
 const dbconnection =()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"jobBoard"
    }).then(()=>{
        console.log("connected to database !!!");
    }).catch(err=>{
        console.log(`some error occured while connecting to databse: ${err}`);
    });

    
}
dbconnection();


// Routes
app.use('/api/company', require('./routes/companyRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
