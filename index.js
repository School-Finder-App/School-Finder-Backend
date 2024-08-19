import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/user_route.js";
import cors from 'cors';
import { toJSON } from "@reis/mongoose-to-json";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import errorHandler from "errorhandler";
import session from "express-session";
import MongoStore from "connect-mongo";
import { appStatusRouter } from "./router/appStatus.js";
import {contactRouter} from "./router/contact.js";
import {curriculumRouter} from "./router/curriculum.js";
import {facebookRouter} from "./router/facebook.js";
import {formRouter} from "./router/form.js"
import { instagramRouter } from "./router/instagram.js";
import { videoRouter } from "./router/videos.js";
import {picturesRouter} from "./router/pictures.js";
import {schoolRouter} from "./router/schools.js";
import {vacancyRouter} from "./router/vacancy.js";
import {websiteRouter} from "./router/website.js";
import {whatsAppRouter} from "./router/whatsapp.js";
import { locationRouter } from "./router/location.js";


//make database connection
await mongoose.connect(process.env.MONGO_URL);
console.log('Database is connected');


// Create an express app
const app = express();


//for the swagger UI
expressOasGenerator.handleResponses(app, {
    alwaysServeDocs: true,
    tags: ['users', 'schools','facebook', 'appStatus','website', 'contact','instagram','location', 'pictures','vacancy','videos','whatsApp'],
    mongooseModels: mongoose.modelNames(),
});


//use middlewares
// app.use(cors({ credentials: true, origin: '*' }));
app.use(cors({
  credentials: true,
  origin: process.env.ALLOWED_DOMAINS?.split(',') || [
    'http://localhost:5173',
    'https://school-finders-app.netlify.app',
    'http://localhost:5174'
  ]
}));

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "UP" });
});


// instantiate dbconnection
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    // Store session
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL
    }),
  })
);


//Apply middlewares
// app.use(cors());


//Use Routes
app.use("/api/v1", userRouter);
app.use("/api/v1", appStatusRouter);
app.use("/api/v1", contactRouter);
app.use("/api/v1", curriculumRouter);
app.use("/api/v1", facebookRouter);
app.use("/api/v1", instagramRouter);
app.use("/api/v1", locationRouter)
app.use("/api/v1", picturesRouter);
app.use("/api/v1", schoolRouter);
app.use("/api/v1", vacancyRouter);
app.use("/api/v1", videoRouter);
app.use("/api/v1", websiteRouter);
app.use("/api/v1", whatsAppRouter);
app.use("/api/v1", formRouter);




//  use generator
expressOasGenerator.handleRequests();
app.use((req, res) => res.redirect("/api-docs"));
app.use(errorHandler({ log: false }));

const reboot = async () => {
  setInterval(restartServer, process.env.INTERVAL)
};



//listening for incoming requests on port
const port = process.env.PORT || 7090;
app.listen(port, () =>{
        console.log(`App is listening on ${port}`);
    });

    // dbConnection()
    // .then(() => {
    //   const PORT = process.env.PORT || 7090;
    //   app.listen(PORT, () => {
    //     reboot().then(() => {
    //       console.log(`Server Restarted`);
    //     });
    //     console.log(`App is listening on port ${PORT}`);
    //   });
    // })
    // .catch((err) => {
    //   console.log(err);
    //   process.exit(-1);
    // });