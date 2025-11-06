// // const express= require("express")
// // const {connectTOMongoDB}= require("./connect")
// // const urlRoute= require("./routes/url")
// // const app = express()
// // const port= 8001

// // connectTOMongoDB("mongodb://localhost:27017/short-url")
// // app.use(express.json())
// // .then(()=>console.log("Mongodb connected"))
// // app.use("/url",urlRoute)

// // app.listen(port,()=>console.log(`Server started at port${port}`))


// // // nodemon se jabki hum kuch changes karenge humara server automatically restart ho jayega


// const express = require("express");
// const { connectTOMongoDB } = require("./connect");
// const urlRoute = require("./routes/url");
// const app = express();
// const port = 8001;

// // Pehle MongoDB connect kar
// connectTOMongoDB("mongodb://localhost:27017/short-url")
//   .then(() => console.log("Mongodb connected"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // Middleware
// app.use(express.json());

// // Routes
// app.use("/url", urlRoute);

// app.get("./:shortId",async(req,res)=>{
//     const shortId=req.params.shortId
//     const entry=await URL.findOneAndUpdate({
//         shortId
//     },{$push:{
//         visitHistory: {timestamp:Date.now()},
//     }
// }
// )
// res.redirect(entry.redirectURL)
// })

// // Server start
// app.listen(port, () => console.log(`Server started at port ${port}`));
const express = require("express");
const path = require("path");

const { connectTOMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute= require("./routes/staticRoute")
const URL = require("./models/url"); // <-- import model
const app = express();
const port = 8001;

// MongoDB Connection
connectTOMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(" MongoDB connection error:", err));


app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}))


// Routes
app.use("/url", urlRoute);

app.use("/",staticRoute)

// Route for Home Page
app.get("/test", async(req, res) => {
  const allUrls= await URL.find({})
  res.render("home");  // renders views/home.ejs
});

// Route for redirecting short URLs
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );

  if (!entry) return res.status(404).json({ error: "URL not found" });
  res.redirect(entry.redirectUrl);
});

// Server Start
app.listen(port, () => console.log(`🚀 Server started at port ${port}`));



// 💯🔥 Bhai, ekdum sahi samjha hai tu!
// Tu literally pura backend architecture samajh gaya — bas ab main thoda aur clearly 1-2 level deep samjha deta hu taaki tujhe flow crystal clear ho jaye 👇

// 🧩 1️⃣ Controller (Logic part)

// “Yaha likha hota hai asli kaam – kya karna hai jab koi route hit ho.”

// ✅ Example:

// Request aayi → ek URL mila

// Controller bolega → “Accha mujhe URL mila hai, chalo iska shortId generate karta hu”

// DB me store karega

// Response bhej dega user ko

// 👉 Yani controller = brain of the route 🧠
// (Controller sirf kaam karta hai, route sirf “path” define karta hai.)

// 🛣️ 2️⃣ Routes (Path define karna)

// “Routes decide karte hain kaunsa URL kis controller ko call karega.”

// Example:
// router.post("/", handleGenerateNewShortUrl)

// Jab koi POST /url kare → handleGenerateNewShortUrl() chalega.

// Agar tu router.get("/all", getAllUrls) likhta hai → fir GET request /url/all pe handle hoti.

// Yani route = traffic police 🧍‍♂️
// "Request kidhar jaye, kis controller ke paas" — yeh decide karta hai.

// 🌐 3️⃣ connect.js (Database connection)

// “Yeh MongoDB se connection banata hai.”

// Example:
// mongoose.connect("mongodb://localhost:27017/short-url")
// Yeh ek promise return karta hai.

// Agar connect ho gaya → server ko pata chal jata hai “ab main DB se baat kar sakta hu.”

// Yani connect.js = bridge between backend aur database 🌉

// ⚙️ 4️⃣ index.js (Main entry point)

// “Yeh saare pieces ko ek jagah jodta hai aur server start karta hai.”

// Kya karta hai:

// Express app banata hai

// connect.js se MongoDB connect karta hai

// Routes ko use karta hai (app.use("/url", urlRoute))

// Server start karta hai (app.listen(8001))

// Yani index.js = controller, routes, aur DB sabko ek team me laata hai ⚡
// Aur bolta hai — “chalo ab sab ready ho, main server start karta hu!”

// 🔄 Overall Flow Diagram:
// Client Request (POST /url)
//         ↓
// Route (routes/url.js)
//         ↓
// Controller (controllers/url.js)
//         ↓
// Model (models/url.js) → MongoDB
//         ↓
// Response sent back to Client
// Tu chahe toh main tujhe ek chhota sa visual diagram bana ke dikhau —
// ekdum arrows ke sath “Request → Route → Controller → Model → DB → Response”?
// Dekhne se aur clear ho jayega flow.
// Banau kya bhai?

