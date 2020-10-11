// Refactoring all the methods into a class
class apiFeatures {
  // Properties will be available on each instance of this class
  constructor(query, queryString) {
    this.query = query;
    this.queryStr = queryString;
  }

   // Filter out some query params fields if they are passed in...
  filter() {
    // querystring available on Consructor
    const queryObj = { ...this.queryStr }
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach( el => delete queryObj[el] );
    
    // Advanced filtering
    console.log(queryObj)
    let queryStr = JSON.stringify(queryObj)

    // Find operators in the query string
    // Look for gte, gt, lt, lte and replace with dollar prepend
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr))
    
    return this;
  }

  sort(){
    if ( this.queryStr.sort ){
      const sortBy = this.queryStr.sort.split(',').join(' ');
      // Mongoose Document methods available on the query as it's an instance of 'Tour'
      this.query = this.query.sort(sortBy);
    } else { 
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields(){
     // Find by specified fields
     if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else { 
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
      // Pagination
      const page = this.query.page * 1 || 1; //  convert string to number
      const limit = this.query.limit * 1 || 100; 
      const skip = ( page - 1 ) * limit;
      
      this.query = this.query.skip(skip).limit(limit);
      return this;
  }
}

module.exports = apiFeatures;