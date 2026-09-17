const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const geocodingClient = mbxGeocoding({
    accessToken: process.env.MAP_TOKEN
});

module.exports.index = async (req, res) => {
    const { category, q } = req.query;

    let filter = {};

    // Category filter
    if (category) {
        filter.category = category;
    }

    // Search filter
    if (q) {
        filter.$or = [
            { title: { $regex: q, $options: "i" } },
            { location: { $regex: q, $options: "i" } },
            { country: { $regex: q, $options: "i" } }
        ];
    }

    const allListings = await Listing.find(filter);

    res.render("listings/index.ejs", {
        allListings,
        selectedCategory: category || "All",
        searchQuery: q || ""
    });
};

module.exports.renderNewForm = (req, res) =>{
    res.render("listings/new.ejs");
};

module.exports.showListing = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
    populate: {
        path: "author",
    },
 })
    .populate("owner");
    if(!listing) {
         req.flash("error", "Listing you requested for does not exist!");
         res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {

    const response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        })
        .send();

    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    newListing.geometry = response.body.features[0].geometry;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await newListing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
         req.flash("error", "Listing you requested for does not exist!");
         res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});
};

module.exports.updateListing = async (req, res) => {

    let { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    Object.assign(listing, req.body.listing);

    const response = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1
        })
        .send();

    listing.geometry = response.body.features[0].geometry;

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "New Listing Deleted!");
    res.redirect("/listings")
};