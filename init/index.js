const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
require("dotenv").config();

const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.ATLASDB_URL;

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB Atlas");

    // Find an existing user from Atlas
    const user = await User.findOne();

    if (!user) {
        console.log("No user found in Atlas.");
        console.log("Create an account in your WanderLust app first.");
        await mongoose.connection.close();
        return;
    }

    // Remove existing listings from Atlas
    await Listing.deleteMany({});

    // Add owner + category + geometry
    const listings = initData.data.map((listing, index) => ({
        ...listing,

        owner: user._id,

        category: [
            "Trending",
            "Rooms",
            "Iconic cities",
            "Mountains",
            "Castles",
            "Amazing pools",
            "Camping",
            "Arctic",
            "Farms",
            "Beach"
        ][index % 10],

        geometry: {
            type: "Point",
            coordinates: [77.5946, 12.9716]
        }
    }));

    await Listing.insertMany(listings);

    console.log(`${listings.length} listings added to Atlas!`);

    await mongoose.connection.close();
    console.log("Atlas connection closed");
}

main().catch((err) => {
    console.log(err);
});