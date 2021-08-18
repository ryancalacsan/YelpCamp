const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '6115e84bbb89876be485ea21',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: 'https://res.cloudinary.com/dzij6q0ku/image/upload/v1629151568/YelpCamp/js00flqokddlvyantbfa.jpg',
          filename: 'YelpCamp/js00flqokddlvyantbfa',
        },
        {
          url: 'https://res.cloudinary.com/dzij6q0ku/image/upload/v1629151568/YelpCamp/tex3sev1un6lfyp5sk9d.jpg',
          filename: 'YelpCamp/tex3sev1un6lfyp5sk9d',
        },
      ],
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et eveniet, eligendi tempora provident assumenda quas? Dignissimos itaque accusantium sequi iusto, odio veritatis tempora quis ratione doloremque molestias odit quibusdam illo!',
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
