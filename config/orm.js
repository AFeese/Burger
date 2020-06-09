const connection = require("./connection.js");



// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {

      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
        arr.push(key + "=" + value);
    }
  }
  return arr.toString();
};

// Object for all our SQL statement functions.
const orm = {
  all: function (tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  
  create: function (table, cols, vals, cb) {
    var queryString = `INSERT INTO ` + table + ` (` + cols.toString() + `) VALUES ( ? )`;

    // queryString += " (";
    // queryString += cols.toString();
    // queryString += ") ";
    // queryString += "VALUES (";
    // queryString += printQuestionMarks(vals.length);
    // queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  // An example of objColVals would be {name: panther, sleepy: true}
  update: function (table, objColVals, condition, cb) {
    var queryString = `UPDATE ` + table + ` SET ` + objToSql(objColVals) + ` WHERE ` + condition;
    // queryString += " SET ";
    // queryString += objToSql(objColVals);
    // queryString += " WHERE ";
    // queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  //   delete: function(table, condition, cb) {
  //     var queryString = "DELETE FROM " + table;
  //     queryString += " WHERE ";
  //     queryString += condition;

  //     connection.query(queryString, function(err, result) {
  //       if (err) {
  //         throw err;
  //       }

  //       cb(result);
  //     });
  //   }
};

module.exports = orm;
