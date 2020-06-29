const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const port = 3000;

/* Middleware
   Define at the start of the req/response cycle
*/

// Add body data to req object
app.use(morgan('dev'))
app.use(express.json());

// Signature always the same
app.use( (req, res, next) => {
  // Call next to progress the response
  next();
})

// Add a requestedAt middleware time
app.use( (req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/', (req, res) => {
  res
  .status(200)
  .json({
      status: 'success',
      message: 'API'
  })
})

/*  Controllers */

const getAllTours = (req, res) => {
  console.log(req.reqTime)
  res
  .status(200)
  // Follows JSend format
  .json({
    status: 'success',
    requestedAt: req.reqTime,
    data: { 
      tours 
    },
    results: tours.length
  })
}

const getTour = (req, res) => { 
  const tourId = parseInt(req.params.id);
  console.log(req.params)
  const tour = tours.find( tour => tour.id === tourId );
  // Could also check id against tours length
  // if tourId > tour.length
  if ( !tour ) {
    return res
    .status(404)
    .json({
      status: "fail",
      message: 'No tour of that id',
      results: 0
    })
  }
  res
  .status(200)
  // Follows JSend format
  .json({
    status: 'success',
    data: {
      tour
    },
    results: 1
  })
}

const createTour = (req, res) => {
  const data = req.body;
  const newId = tours[tours.length -1].id + 1;

  // Copy source object and add a property
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour)
  
  // Write to server here
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), ( err ) => {
      console.log(err)
      res.status(201) // 'created' status
      res.json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
    }); 
}

const updateTour = (req, res) => {
  const tourId = parseInt(req.params.id);
  const tour = tours.find( tour => tour.id === tourId );
  console.log(tour)
  console.log(tourId)
  if ( !tour ) {
    return res
    .status(404)
    .json({
      status: "fail",
      message: 'No tour exists with that ID'
    })
  }
  res.status(200)
  // Follows JSend format
  // Patch operation here
  .json({
    status: 'success',
    data: {
      tour
    }
  });
}

const deleteTour = (req, res) => {
  const tourId = parseInt(req.params.id);
  const tour = tours.find( tour => tour.id === tourId );
  console.log(tour)
  console.log(tourId)
  if ( !tour ) {
    return res
    .status(404)
    .json({
      status: "fail",
      message: 'No tour exists with that ID'
    })
  }
  res.status(204)
  // Follows JSend format
  // Patch operation here
  .json({
    status: 'success',
    data: null
  });
}

const getAllUsers = (req, res) => {
  res.status(500)
  // Internal server error
  .json( {
      status: 'success',
      message: 'Route not yet defined'
  })
}

const createUser = (req, res) => {
  res.status(500)
  // Internal server error
  .json( {
      status: 'success',
      message: 'Route not yet defined'
  })
}
const getUser = (req, res) => {
  res.status(500)
  // Internal server error
  .json( {
      status: 'success',
      message: 'Route not yet defined'
  })
}

const deleteUser = (req, res) => {
  res.status(500)
  // Internal server error
  .json( {
      status: 'success',
      message: 'Route not yet defined'
  })
}

const updateUser = (req, res) => {
  res.status(500)
  // Internal server error
  .json( {
      status: 'success',
      message: 'Route not yet defined'
    })
  }
  
// Longer format
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.post('/api/v1/tours', createTour)

// 'Sub' application within /tours resource
const tourRouter = express.Router();
const userRouter = express.Router();

// 'Sub' applications within each resource
tourRouter.route('/')
.get(getAllTours)
.post(createTour);

tourRouter.route('/:id')
.get(getTour).patch(updateTour)
.delete(deleteTour)

userRouter.route('/')
.get(getAllUsers)
.post(createUser)
userRouter.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

// Mount routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.listen(port, ()=>{
  console.log(`Running on Port ${port}`)
});