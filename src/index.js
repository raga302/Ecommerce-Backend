import app from "./app.js";
import { DBConnect } from "./db/database.js";
import { router } from "./routes/index.routes.js";


const PORT = process.env.PORT


DBConnect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })


}).catch((err) => console.log(err))

app.use("/api/v1", router)