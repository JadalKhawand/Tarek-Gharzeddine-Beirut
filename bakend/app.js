import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import UsersRoutes from './routes/usersRoutes.js'
import complaintsRoutes from './routes/complaintsRoutes.js'
import dns from "node:dns/promises"
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dotenv.config();
const app = express();
app.use(express.json())

const frontend_origin = "http://localhost:5173"
app.use(cors({ origin: frontend_origin }))

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
        console.log("Server is running on PORT: " + PORT)
    })
}).catch((err) => {
    console.log(err)
    console.log("failed to connect to mongo db")
})

app.use("/auth", UsersRoutes);
app.use("/complaints", complaintsRoutes);
app.use("/uploads", express.static("uploads"));