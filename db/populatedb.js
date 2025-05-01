require('dotenv').config({ path: '../.env' });
const { Client } = require('pg');



const SQL = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS session CASCADE;
    DROP TABLE IF EXISTS posts CASCADE;

    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'user'
    ); 
    CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      content TEXT NOT NULL,
      author_id INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO users (username, password, role) VALUES
      ('1', '1', 'admin'),
      ('7', '$2b$10$A41KWo1q0fMjtjwfzB80Qe/RrakSkmxlnjNjPzboFzldNT3DedSIm', 'admin');


    INSERT INTO posts (title, content, author_id) VALUES
      ('First Post', 'This is the content of the first post.', 1),
      ('Second Post', 'This is the content of the second post.', 2);
`;
   
async function main() {
  console.log('Populating database...');

  if (!process.env.DB_URL) {
    console.error('Error: DB_URL is not defined. Check your .env file.');
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DB_URL
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('Database populated!');
}

main();