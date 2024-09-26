const bcrypt = require('bcryptjs');
const hashedPassword = bcrypt.hashSync('123', 10);
console.log(`Hashed password: ${hashedPassword}`);