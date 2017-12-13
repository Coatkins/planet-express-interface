var sqlite = require('sqlite');

sqlite.open('./database.sqlite').then(function() {
  return sqlite.migrate({ force: 'last' });
}).catch(function(err){
  console.error(err.stack);
});