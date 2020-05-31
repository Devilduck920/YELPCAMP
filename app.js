const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true, })

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');


const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
})

const Campground = mongoose.model('Campground', campgroundSchema)

// Campground.create(
//   {
//     name: 'Granite Hill',
//     image: 'https://pixabay.com/get/57e1dd4a4350a514f1dc84609620367d1c3ed9e04e50744075277cd5914ac7_340.jpg'
//   }, (err, campground) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log('Newly Created Campground! ' + campground)
//     }
//   }
// )



app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds', { campgrounds: allCampgrounds })
    }
  })

});

app.post('/campgrounds', (req, res) => {
  let name = req.body.name
  let image = req.body.image
  let newCampground = { name, image }
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })

})

app.get('/campgrounds/new', (req, res) => {
  res.render('new.ejs')
})

app.listen(3000, () => {
  console.log('YelpCamp Server has started');
});
