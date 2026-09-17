const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMAte = require("ejs-mAte");
const ExpressError = require("./utils/Expresserror.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
require("dotenv").config();
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const { MongoStore } = require("connect-mongo");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMAte);
app.use(express.static(path.join(__dirname,"/public")));
app.use((req, res, next) => {
    res.locals.MAP_TOKEN = process.env.MAP_TOKEN;
    next();
});

const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,

    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        collectionName: "sessions",
        ttl: 7 * 24 * 60 * 60
    }),

    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();

});

// app.get("/demouser", async(req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     });

//     let registerdUser = await user.register(fakeUser, "helloworld");
//     res.send(registerdUser);
// })

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

app.all("/*splat", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;

    if (res.headersSent) {
        return next(err);
    }

    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("server is listening on port 8080");
});