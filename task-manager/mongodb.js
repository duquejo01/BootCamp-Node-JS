
/**
 * 
 * CRUD Operations with MongoDB
 * 
 * @requires mongodb
 */
const { MongoClient, ObjectId } = require('mongodb');

/**
 * @see MongoDB default port 27017
 */
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

/**
 * ObjectId returns a new ObjectId value
 * It's used to control the unique ObjectId Value, Once instanciated we 
 * can access to timestamp and some ObjectId methods.
 */
// const id = new ObjectId();
// console.log(id.id.length);
// console.log(id.getTimestamp());
// console.log(id.toHexString().length);

/**
 * MongoClient parameters
 * @param connectionURL
 * @param options
 * @param callback
 */
MongoClient.connect( connectionURL, { useNewUrlParser: true }, ( error, client ) => {

  // Bail and end conn
  if( error )  return console.error('Unable to connect to database');

  // Database manipulation
  const db = client.db( databaseName );

  /**
   * Collection Querying (Just One)
   */
  // db.collection('users').findOne({

  //   // _id: '613ac058aa3f4afffb1cac92' // No results because it needs to be a valid ObjectId instance.
  //   _id: new ObjectId('613ac058aa3f4afffb1cac92') // Valid query param! ;)

  // }, ( error, user ) => {
  //   if( error ) return console.error('Unable to fetch');

  //   /**
  //    * @see null is a valid value, That's a result of a not found value. 
  //    */
  //   console.log( user );
  // });

  /**
   * Collection Querying (All results *)
   * @see Isn't neccesary to provide second argument (cursor: Pointer to data.)
   * 
   * Challenge #2
   * Make multiple queries with findOne() and find() methods.
   */
  db.collection('tasks').findOne({
    _id: new ObjectId('613abbe56d5ffaff01834fbe')
  }, ( error, task ) => {
    if( error ) return console.log('Unable to fetch');
    console.log( `Last task: ${task.description}` );
  });

  db.collection('tasks').find({ completed: true }).toArray( ( error, tasks ) => {
    tasks.map( task => console.log( task.description ));
  });

  /**
   * Collection updating
   * 
   * @param filter
   * @param update (Use $set to set an object )
   * 
   * @see READ_THIS for more update criterias https://docs.mongodb.com/manual/reference/operator/update/
   * 
   */

  const updatePromise = db.collection('users').updateOne({
    _id: new ObjectId('613abadd7d94fc069d51e936')
  }, {
    // $set:{
    //   name: 'Mike'
    // }
    $inc : {
      age: 1 // Increment, -1 for decrement
    }
  });

  /**
   * Using promises to do actions with the Update Promises
   */
  updatePromise.then( ( result ) => {

    /**
     * modifiedcount (Files updated successfully)
     * matchedcount (Files matched with criteria)
     */
    console.log( result );
  }).catch( ( error ) => {
    console.error( error );
  });

  /**
   * Update Many Logic
   * 
   * @param filter
   * @param update (Use $set to set an object )
   * 
   * @see READ_THIS for more update criterias https://docs.mongodb.com/manual/reference/operator/update/
   */
  const updateManyPromise = db.collection('tasks').updateMany({
    completed: false
  }, {
    $set: {
      completed: true
    }
  });

  updateManyPromise.then( (result) => {
    console.log( result );
  }).catch( ( error ) => {
    console.error( error );
  });
  
  /**
   * 
   * Delete Many logic
   * 
   * @param filter
   * 
   */
  db.collection('users').deleteMany({
    age: 27
  }).then( result => {
    console.log( result );
  }).catch( error => {
    console.log( error );
  });

  /**
   * Delete One Logic
   */
  db.collection('tasks').deleteOne({
    description: 'Clean dishes'
  })
  .then( result => console.log( result ))
  .catch( error => console.log( error ));


  /**
   * 
   * Collection Insertion (insertOne)
   * 
   * @param document
   *  @param _id Unique identifier (Autogenerated)
   *  @param name (Custom field for our users table)
   *  @param age (Custom field for our users table)
   * 
   * @param callback When Operation is complete
   */
  db.collection('users').insertOne({
    _id: id,
    name: 'Eliana',
    age: 52
  }, ( error, result ) => {
    if( error ) return console.error('Unable to insert user');

    /**
     * All IDs inside
     * @param result.insertedId (insertOne) method
     * @param result.insertedIds (insertMany) method
     */
    console.log( result.insertedId );
  });

  /**
   * 
   * Collection Insertion (insertMany)
   * 
   * @param documents
   * 
   * @param callback When Operation is complete
   */  
  db.collection('users').insertMany([
    {
      name: 'Sergio',
      age: 27
    },{
      name: 'Sofía',
      age: 28
    }
  ], ( error, result ) => {
    if( error ) return console.error('Unable to insert documents.');
    console.log( result.insertedIds );
  });

  /**
   * Challenge #1: Create a new tasks Collection
   * #Step: Add three documents inside.
   */
  db.collection('tasks').insertMany([{
    description: 'Clean dishes',
    completed: false
  },{
    description: 'Feed & Pet Tito',
    completed: true
  },{
    description: 'Update Readme.md comments',
    completed: true
  }], ( error, result ) => {
    if( error ) return console.error('Unable to insert tasks');

    // Show last three added ids
    console.log( result.insertedIds );
  });

});