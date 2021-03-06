/**
 * Playing with Node Input Module
 * 
 * @see process.argv to get input arguments (System native alternative)
 * 
 * @requires yargs NPM Library - It will be our input variables parser
 * @requires notes.js Custom Library - It has a lots of file handling methods.
 * 
 */
const chalk     = require('chalk'); // Pretty print
const yargs     = require('yargs'); // args parsing
const notes     = require('./notes'); // Custom user package

// console.log( process.argv );

// if ( command === 'add' ){
//   console.log( 'Adding note!!!' );
// } else if ( command === 'remove' ){
//   console.log( 'Remove note!!!' );
// }

/**
 * yargs!
 * @description yargs provide more useful options for the input variables
 * 
 * - Customize yargs version: yargs.version()
 */
// yargs.version('1.1.0');

// Create add command
/**
 * Adds a new command
 * @param command 'Command name' (Ex: --command)
 * @param describe 'Descriptive text'
 * @param handler 'Command Callback'
 * @param builder 'Generate custom attributes for the current command'
 *    @param describe 'Command attribute description'
 *    @param demandOption 'is Command attribute mandatory?'
 *    @param type 'Sets the Command attribute type' (default: boolean)
 * 
 */

// Add Command
yargs.command({
  command:  'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler( argv ) {
    notes.addNote( argv.title, argv.body );
  }
});


// Remove Command
yargs.command({
  command:  'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Remove a note by title',
      demandOption: true,
      type: 'string'
    }
  },
  handler( argv ) {
    notes.removeNote( argv.title );
  }
});


// List Command
yargs.command({
  command:  'list',
  describe: 'List notes',
  handler() {
    notes.listNotes(); 
  }
});


// Read Command
yargs.command({
  command:  'read',
  describe: 'Reading the note',
  builder: {
    title: {
      describe: 'Read a existing note',
      demandOption: true,
      type: 'string'
    }
  },
  handler( argv ) {
    notes.readNote( argv.title );
  }
});

/**
 * Yargs method for show the added commands
 */
yargs.parse();

/**
 * *****************************************************************************
 * If we want to debug a Node JS Application we use debugger native reserved word
 * > node inspect [..args]
 * 
 * 1. Check Chrome: chrome://inspect/#devices URL
 * 2. Open target (Configure remote ports)
 * 3. Run/pause script execution
 * 
 * *****************************************************************************
 * If  we want to check errors messages for hints
 * 
 */