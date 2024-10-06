import {connectDB} from './src/db/dbConnect.js';
import {app} from './src/app.js';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const PORT=5000;

const DB_url = `${process.env.mongo_DB}/shortner_URL`;
connectDB(DB_url)
.then(() => {
    app.listen(process.env.PORT|| 5000, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})