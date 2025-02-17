const sampleListings = [
  // 15 listings for India
  {
    title: "Beautiful Beach House in Goa",
    description: "A cozy beach house near Baga Beach in Goa.",
    price: 1000,
    location: "Goa, India",
    country: "India",
    image: {
      url: "https://blog.lohono.com/wp-content/uploads/2024/05/Glass-House-43-scaled.jpg",
      filename: "goa1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [15.2993, 73.8037], // Latitude, Longitude for Goa
    },
    category: "Amazing pools",
  },
  {
    title: "Luxury Apartment in New Delhi",
    description: "A modern apartment with an amazing view of the city.",
    price: 5000,
    location: "New Delhi, India",
    country: "India",
    image: {
      url: "https://th.bing.com/th/id/OIP.gXbH8296IMveUsXzdcSZ7QHaFj?rs=1&pid=ImgDetMain",
      filename: "delhi1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [28.6139, 77.1025], // Latitude, Longitude for New Delhi
    },
    category: "Iconic cities",
  },
  {
    title: "Luxury Stay in Mumbai",
    description:
      "Experience the vibrant city life of Mumbai in a luxurious apartment.",
    price: 12000,
    location: "Mumbai, Maharashtra, India",
    country: "India",
    image: {
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/219893190.jpg?k=19d35bfaa89b4a699cd2aaec643d9ceaa4caa71432e4706f01af68dd9d56b1e2&o=&hp=1",
      filename: "mumbai1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0",
    geometry: {
      type: "Point",
      coordinates: [19.076, 72.8777],
    },
    category: "Iconic cities",
  },
  {
    title: "Heritage Stay in Udaipur",
    description:
      "Stay in a royal palace overlooking the serene Pichola Lake in Udaipur.",
    price: 11000,
    location: "Udaipur, Rajasthan, India",
    country: "India",
    image: {
      url: "https://www.thegrandindianroute.com/wp-content/uploads/2024/03/Untitled-design-92.jpg",
      filename: "udaipur1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0",
    geometry: {
      type: "Point",
      coordinates: [24.5854, 73.7125],
    },
    category: "Castles",
  },
  {
    title: "Desert Camp Experience in Jaisalmer",
    description:
      "Experience the desert under the stars with luxury camping in Jaisalmer.",
    price: 4000,
    location: "Jaisalmer, Rajasthan, India",
    country: "India",
    image: {
      url: "https://th.bing.com/th/id/OIP.EqfADBHNJzgq-wzwERKFYAHaDt?rs=1&pid=ImgDetMain",
      filename: "jaisalmer1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0",
    geometry: {
      type: "Point",
      coordinates: [26.9124, 70.9176],
    },
    category: "Camping",
  },
  {
    title: "Royal Palace Stay in Jaipur",
    description:
      "Stay in the heart of Jaipur with stunning views of the Amber Fort.",
    price: 9500,
    location: "Jaipur, Rajasthan, India",
    country: "India",
    image: {
      url: "https://th.bing.com/th/id/OIP.Uk8_h3DlDcHMIVm6BKFxNAHaE8?rs=1&pid=ImgDetMain",
      filename: "jaipur1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0",
    geometry: {
      type: "Point",
      coordinates: [26.9124, 75.7873],
    },
    category: "Castles",
  },
  {
    title: "Mountain Retreat in Himachal Pradesh",
    description: "A peaceful retreat surrounded by lush green mountains.",
    price: 2500,
    location: "Himachal Pradesh, India",
    country: "India",
    image: {
      url: "https://a0.muscache.com/pictures/bb64a743-b8b5-4a60-bb13-bca783f0932a.jpg",
      filename: "himachal1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [32.0782, 77.419], // Latitude, Longitude for Himachal Pradesh
    },
    category: "Mountains",
  },
  {
    title: "Historic Fort Stay in Rajasthan",
    description:
      "Stay in a royal fort with beautiful views and luxurious rooms.",
    price: 4500,
    location: "Rajasthan, India",
    country: "India",
    image: {
      url: "https://images.trvl-media.com/lodging/68000000/67660000/67659000/67658966/w3340h2317x0y0-f33c8eaf.jpg?impolicy=resizecrop&rw=598&ra=fit",
      filename: "rajasthan1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [26.8467, 73.8741], // Latitude, Longitude for Rajasthan
    },
    category: "Castles",
  },
  {
    title: "Beachfront Paradise in Goa",
    description:
      "Relax in a luxurious beachfront villa in Goa with stunning ocean views.",
    price: 8000,
    location: "Goa, India",
    country: "India",
    image: {
      url: "https://th.bing.com/th/id/OIP.8qVszah6RwFyRD2qZrWjOwHaE8?rs=1&pid=ImgDetMain",
      filename: "goa1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0",
    geometry: {
      type: "Point",
      coordinates: [15.2993, 74.1247],
    },
    category: "Amazing pools",
  },
  {
    title: "Cozy Cottage in Rishikesh",
    description: "Relax in a beautiful riverside cottage near Rishikesh.",
    price: 1500,
    location: "Rishikesh, India",
    country: "India",
    image: {
      url: "https://d2vcelvjdj7n25.cloudfront.net/media/property_photos/image_watermarked_1024/24285632/b_watermarked_image_1024.jpeg",
      filename: "rishikesh1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [30.092, 78.2676], // Latitude, Longitude for Rishikesh
    },
    category: "Camping",
  },
  {
    title: "Misty Mountain Retreat in Darjeeling",
    description:
      "Escape to the hills and enjoy the serenity of a mountain retreat in Darjeeling.",
    price: 6000,
    location: "Darjeeling, West Bengal, India",
    country: "India",
    image: {
      url: "https://th.bing.com/th/id/OIP.KZ4q8DyLfzAM5Y42zHLV0wHaE8?rs=1&pid=ImgDetMain",
      filename: "darjeeling1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0",
    geometry: {
      type: "Point",
      coordinates: [27.0379, 88.2625],
    },
    category: "Mountains",
  },
  {
    title: "Serene Backwaters in Kerala",
    description: "A tranquil stay by the beautiful backwaters of Kerala.",
    price: 7000,
    location: "Alleppey, Kerala, India",
    country: "India",
    image: {
      url: "https://th.bing.com/th/id/OIP.kO-J2XMs5msEPYHNatvocQHaE7?rs=1&pid=ImgDetMain",
      filename: "kerala1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0",
    geometry: {
      type: "Point",
      coordinates: [9.5001, 76.3536],
    },
    category: "Rooms",
  },
  {
    title: "Luxury Eco-Resort in Coorg",
    description:
      "Stay in a green eco-resort surrounded by coffee plantations in Coorg.",
    price: 8000,
    location: "Coorg, Karnataka, India",
    country: "India",
    image: {
      url: "https://images.trvl-media.com/hotels/28000000/27150000/27149000/27148931/f20014bd_z.jpg",
      filename: "coorg1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0",
    geometry: {
      type: "Point",
      coordinates: [12.2974, 75.7138],
    },
    category: "Rooms",
  },
  {
    title: "Vibrant Stay in Bangalore",
    description:
      "Experience the vibrant culture and food scene in Bangalore with a luxury stay.",
    price: 8500,
    location: "Bangalore, Karnataka, India",
    country: "India",
    image: {
      url: "https://htl-img-res-new.s3.ap-south-1.amazonaws.com/4520/20230522/main.jpg",
      filename: "bangalore1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0",
    geometry: {
      type: "Point",
      coordinates: [12.9716, 77.5946],
    },
    category: "Rooms",
  },

  // 5 listings for Canada
  {
    title: "Luxury Condo in Toronto",
    description: "A modern luxury condo in the heart of Toronto.",
    price: 3000,
    location: "Toronto, Canada",
    country: "Canada",
    image: {
      url: "https://th.bing.com/th/id/OIP.HpDnKptNgF6EstFWsQCcqQHaE8?w=1024&h=683&rs=1&pid=ImgDetMain",
      filename: "toronto1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [43.6532, -79.3832], // Latitude, Longitude for Toronto
    },
    category: "Iconic cities",
  },
  {
    title: "Beautiful Cabin in Banff",
    description: "A peaceful cabin surrounded by mountains and lakes in Banff.",
    price: 2000,
    location: "Banff, Canada",
    country: "Canada",
    image: {
      url: "https://th.bing.com/th/id/OIP.g1ZO1Q0-rrxTLayeiJcPgwHaE8?rs=1&pid=ImgDetMain",
      filename: "banff1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [51.1784, -115.9281], // Latitude, Longitude for Banff
    },
    category: "Mountains",
  },
  {
    title: "Charming House in Vancouver",
    description: "A charming house in a quiet neighborhood in Vancouver.",
    price: 3500,
    location: "Vancouver, Canada",
    country: "Canada",
    image: {
      url: "https://media.onthemarket.com/properties/11129901/1373414661/image-0-1024x1024.jpg",
      filename: "vancouver1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [49.2827, -123.1216], // Latitude, Longitude for Vancouver
    },
    category: "Iconic cities",
  },
  {
    title: "Lakeside Cottage in Ontario",
    description:
      "Enjoy your stay in a lakeside cottage with breathtaking views.",
    price: 2500,
    location: "Ontario, Canada",
    country: "Canada",
    image: {
      url: "https://th.bing.com/th/id/OIP.BGyM20oceM4rC7t6lNpnHAHaFu?rs=1&pid=ImgDetMain",
      filename: "ontario1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [43.6532, -81.2518], // Latitude, Longitude for Ontario
    },
    category: "Farms",
  },
  {
    title: "Snowy Mountain Lodge in Whistler",
    description: "A luxurious lodge in Whistler, perfect for ski lovers.",
    price: 4000,
    location: "Whistler, Canada",
    country: "Canada",
    image: {
      url: "https://th.bing.com/th/id/R.b25f2f2f7ca497b01e38ac9788512836?rik=Pk8oLSuPgkyCtQ&riu=http%3a%2f%2fsnowshare.ringingspurs.com%2fwr_bilder%2forg%2f522_Glacier-Lodge-Whistler.jpg&ehk=YIpeafqvG7o36cDZBagN9cAbnRqTF7R3tZjNy17kk3g%3d&risl=&pid=ImgRaw&r=0",
      filename: "whistler1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [50.116, -122.9574], // Latitude, Longitude for Whistler
    },
    category: "Mountains",
  },

  // 7 listings for the USA
  {
    title: "Modern Penthouse in New York City",
    description: "A luxurious penthouse with a view of the skyline.",
    price: 5000,
    location: "New York City, USA",
    country: "USA",
    image: {
      url: "https://th.bing.com/th/id/OIP.tOrydk5j46G7kWuS1elhsgHaE8?rs=1&pid=ImgDetMain",
      filename: "nyc1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [40.7128, -74.006], // Latitude, Longitude for New York City
    },
    category: "Iconic cities",
  },
  {
    title: "Beachfront Villa in Miami",
    price: 4500,
    location: "Miami, USA",
    country: "USA",
    image: {
      url: "https://luxury-houses.net/wp-content/uploads/2020/11/Perfectly-Designed-Modern-Home-in-Miami-Beach-Sells-for-6499000-20-768x497.jpg",
      description: "A beachfront property with stunning views of the ocean.",
      filename: "miami1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [25.7617, -80.1918], // Latitude, Longitude for Miami
    },
    category: "Amazing pools",
  },
  {
    title: "Mountain Home in Denver",
    description: "A peaceful mountain home with spectacular views.",
    price: 3500,
    location: "Denver, USA",
    country: "USA",
    image: {
      url: "https://st.hzcdn.com/simgs/pictures/exteriors/mountain-home-exteriors-bhh-partners-planners-architects-img~b61145fe010af190_9-6261-1-e6de8d5.jpg",
      filename: "denver1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [39.7392, -104.9903], // Latitude, Longitude for Denver
    },
    category: "Mountains",
  },
  {
    title: "Rustic Cabin in the Great Smoky Mountains",
    description:
      "A cozy cabin near the Great Smoky Mountains, perfect for nature lovers.",
    price: 2500,
    location: "Great Smoky Mountains, USA",
    country: "USA",
    image: {
      url: "https://4.bp.blogspot.com/_olUeUmi4NwI/TRvMxegvQAI/AAAAAAAAAcw/vISoCC1cCCg/s1600/DSC_0493.JPG",
      filename: "smoky1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [35.6118, -83.4895], // Latitude, Longitude for Smoky Mountains
    },
    category: "Mountains",
  },
  {
    title: "Lake House in Wisconsin",
    description:
      "A charming lake house with a large deck overlooking the water.",
    price: 2800,
    location: "Wisconsin, USA",
    country: "USA",
    image: {
      url: "https://th.bing.com/th/id/OIP.txR2N7eUaMP9Oa1NvXaEmAHaE8?rs=1&pid=ImgDetMain",
      filename: "wisconsin1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [43.0731, -89.3985], // Latitude, Longitude for Wisconsin
    },
    category: "Farms",
  },
  {
    title: "Desert Oasis in Arizona",
    description: "A desert oasis with a private pool and scenic views.",
    price: 3200,
    location: "Arizona, USA",
    country: "USA",
    image: {
      url: "https://gallery.streamlinevrs.com/units-gallery/00/03/6C/image_155055171.jpeg",
      filename: "arizona1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [33.4484, -111.0937], // Latitude, Longitude for Arizona
    },
    category: "Amazing pools",
  },
  {
    title: "Luxury Villa in Los Angeles",
    description:
      "A luxury villa with stunning views of the Los Angeles skyline.",
    price: 5000,
    location: "Los Angeles, USA",
    country: "USA",
    image: {
      url: "https://th.bing.com/th/id/R.3a58d8fda51b2cb59f7a00c661e05af0?rik=bCal%2fzUPLOdO9A&riu=http%3a%2f%2fcdn.luxuo.com%2f2017%2f01%2flos-angeles-3.jpg&ehk=Fo2DKjSddS1FoS2tHpJTOa0QdySZWSgm%2bAMqNbETgSU%3d&risl=&pid=ImgRaw&r=0",
      filename: "la1.jpg",
    },
    owner: "67aa20ede3a20e3e8270fde0", // Replace with actual user ID
    geometry: {
      type: "Point",
      coordinates: [34.0522, -118.2437], // Latitude, Longitude for Los Angeles
    },
    category: "Iconic cities",
  },
];

module.exports = { data: sampleListings };
