import { app } from "../app"
import {v2 as cloudinary} from "cloudinary";

require("dotenv").config()

//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
   });

//buat server
const port = process.env.NODE_LOCAL_PORT

app.listen(port, () => {
    console.log(`Server is connected with port ${port}`)
})