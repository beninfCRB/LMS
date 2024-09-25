import { app } from "../app"

require("dotenv").config()

//buat server
const port = process.env.NODE_LOCAL_PORT

app.listen(port, () => {
    console.log(`Server is connected with port ${port}`)
})