# Mongo

- not 'relational' as traditional
- noSQL
- No schema
- Contains a collection ('table')
- Collections contain Documents ('rows')
- Document-based - Key-value pairs
- Relational db don't allow multiple fields (an array in Mongo)
- Uses BSON format
- Document can be nested inside BSON in an array

# Commands
- `mongo`
- `show dbs`
- `use db-name` - switch or make a new one
- `db.db-name.insertMany({},{})` - db is currently-active db. Also `insertOne({})`
- Upload documents as JSON
- Creates a collection called `db-name`
- `db create db-name` or `use db-name`
- `show collections`
- `db.collection-name.findOne({ "name": "nameIWant"} )`
- `db.collection-name.findOne({ "name": { $lte: 5}} )` // Mongo query keyword ( for <= )
- `quit()`
- Pass operators into queries: `db.tours.find({"rating":{ $gte: 4.5  }, "price": {$lte: 500} })`
- Accepts an $or array of filters:  
  `db.tours.find({ $or:[ { "price": {$lte: 500} },  { "name": {$lte: 500}} ]})`
- `updateOne()`, `updateMany()`. Update will only happen on first if many queries are returned.

{ "name": "Epic tour", "price": 550, rating: 4.3 },{ "name": "Epic USA tour", "price": 650, "rating": 4.8 },{ "name": "UK tour", "price": 250, "rating": 4.9, "difficulty": "easy" }

## Models
- Writing new models with extra props not defined in the schema are ignored
- Pass 'validators' to Schema such as `unique: true` or `required keys. Specify on the Schema.
- 'Create' methods will use `new MyModel()` and pass in `req.body`