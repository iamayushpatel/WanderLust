const axios = require("axios");
const Listing = require("../models/listing");

// 1. Index Route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// 3. New Route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// 2. Show Route
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  // populate("reviews") : Give Object Data Of Reviews, // populate("owner") : Give Object Data Of Owners
  if (!listing) {
    req.flash("error", "Listing Does Not Exist..!!"); // Flash Message
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// 4. Create Route
module.exports.createListing = async (req, res, next) => {
  // let {title, description, image, price, country, location} = req.body;
  let url = req.file.path;
  let filename = req.file.filename;
  // Extract location name from the request body (assuming it's in req.body.listing.location)
  const { location } = req.body.listing;

  try {
    // Geocode the location to get coordinates (latitude and longitude)
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      location
    )}&format=json&limit=1`;
    // Make the API request to Nominatim
    const response = await axios.get(geocodeUrl);
    if (response.data && response.data.length > 0) {
      // Get the first result's coordinates (latitude and longitude)
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      // Create a new listing object with coordinates and other details
      const newListing = new Listing(req.body.listing);
      newListing.owner = req.user._id;
      newListing.image = { url, filename };
      newListing.location = location; // Store the location name
      newListing.latitude = lat; // Store the latitude
      newListing.longitude = lon; // Store the longitude
      // Add geometry field (GeoJSON format: Point with [longitude, latitude])
      newListing.geometry = {
        type: "Point",
        coordinates: [lat, lon], // Note that [latitude,longitude] is the correct order for GeoJSON
      };
      let savedListing = await newListing.save();
      console.log(savedListing);
      req.flash("success", "New Listing Created..!!"); // Flash Message
      res.redirect("/listings");
    } else {
      // If no geocoding result was found, handle it
      req.flash("error", "Location not found.");
      res.redirect("/listings/new"); // Redirect to the create listing page
    }
  } catch (error) {
    console.error("Error during geocoding:", error);
    req.flash("error", "Error occurred while geocoding the location.");
    res.redirect("/listings/new"); // Redirect to the listing creation page if an error occurs
  }
};

// 5. Edit Route
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing Does Not Exist..!!");
    res.redirect("/listings");
    return;
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// 6. Update Route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing;
  try {
    // Retrieve the listing by id
    listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
    }
    // Extract location from the updated data, if any
    const { location } = req.body.listing;
    // If location is provided, geocode it to get latitude and longitude
    if (location) {
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        location
      )}&format=json&limit=1`;
      const response = await axios.get(geocodeUrl);
      if (response.data && response.data.length > 0) {
        const lat = response.data[0].lat;
        const lon = response.data[0].lon;

        // Update geometry with the new coordinates
        listing.geometry = {
          type: "Point",
          coordinates: [lat, lon], // [latitude,longitude] is the correct order for GeoJSON
        };
        // Update latitude and longitude fields
        listing.latitude = lat;
        listing.longitude = lon;
      } else {
        req.flash("error", "Location not found.");
        return res.redirect(`/listings/${id}/edit`);
      }
    }
    // Update the other fields of the listing
    Object.assign(listing, req.body.listing);
    // If a new image is uploaded, update the image field
    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
    }
    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error("Error updating listing:", error);
    req.flash("error", "An error occurred while updating the listing.");
    res.redirect(`/listings/${id}/edit`);
  }
};

// 8. Filter Listings
module.exports.filterListings = async (req, res, next) => {
  const { q } = req.params;
  // The exec() method is used to execute the query. It returns a promise, so it is appropriate to use await here.
  const filteredListings = await Listing.find({ category: q }).exec();
  if (!filteredListings.length) {
    req.flash("error", "No Listings exists for this filter!");
    res.redirect("/listings");
    return;
  }
  res.locals.success = `Listings Filtered by ${q}`;
  res.render("listings/index.ejs", { allListings: filteredListings });
};

// 7. Delete Route
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted..!!"); // Flash Message
  res.redirect("/listings");
};


module.exports.search = async(req, res) => {
  console.log(req.query.q);
  let input = req.query.q.trim().replace(/\s+/g, " "); //remove start and end space
  console.log(input);
  if(input == "" || input == " "){
      //search value is empty
      req.flash("error", "Search value empty!!!");
      res.redirect("/listings");
  }

  //convert every word first letter capital and other small
  let data = input.split("");
  let element = "";
  let flag = false;
  for(let index = 0; index < data.length; index++) {
      if (index == 0 || flag) {
          element = element + data[index].toUpperCase();
      } else {
          element = element + data[index].toLowerCase();
      }
      flag = data[index] == " ";
  }
  console.log(element);

  let allListings = await Listing.find({
      title: { $regex: element, $options: "i"},
  });
  if(allListings.length !=0 ){
      res.locals.success = "Listings searched by title";
      res.render("listings/index.ejs", {allListings});
      return;
  }
  if(allListings.length == 0){
      allListings = await Listing.find({
          category: { $regex: element, $options: "i"},
      }).sort({_id: -1});
      if(allListings.length != 0) {
          res.locals.success = "Listings searched by category";
          res.render("listings/index.ejs", {allListings});
          return;
      }
  }
  if(allListings.length == 0) {
      allListings = await Listing.find({
          country: { $regex: element, $options: "i"},
      }).sort({_id: -1});
      if(allListings.length != 0) {
          res.locals.success = "Listings searched by country";
          res.render("listings/index.ejs", {allListings});
          return;
      }
  }
  if(allListings.length == 0) {
      allListings = await Listing.find({
          location: { $regex: element, $options: "i"},
      }).sort({_id: -1});
      if(allListings.length != 0) {
          res.locals.success = "Listings searched by location";
          res.render("listings/index.ejs", {allListings});
          return;
      }
  }

  const intValue = parseInt(element, 10); //10 for decimal return - int ya NaN
  const intDec = Number.isInteger(intValue); //check intValue is number or not

  if(allListings.length == 0 && intDec) {
      allListings = await Listing.find({ price: { $lte: element }}).sort({
          price: 1,
      });
      if(allListings.length != 0) {
          res.locals.success = `Listings searched for less than Rs ${element}`;
          res.render("listings/index.ejs", { allListings });
          return;
      }
  }
  if(allListings.length == 0) {
      req.flash("error", "Listings is not here !!!");
      res.redirect("/listings");
  }
}