const fastify = require('fastify')({
  logger: true
})
 
const db = require('./db');
 
fastify.get('/books/:search', async (request, reply) => {
    const books = await db.query("select sku, judul from books where harga = 90000", [
      `%${request.params.search}%`
      ]);
    return books;
  })
 
fastify.get('/books', async (request, reply) => {
    const books = await db.query("select * from books", [
      `%${request.query.search}%`
      ]);
    return books;
  })
 
fastify.post('/books', async (request, reply) => {
    const books = await db.query("insert into books (sku, judul, harga, stock) VALUES ('asd', 'laskarpelangi', 50000, 100)", [
      `%${request.body.search}%`
      ]);
    return books;
  })
 
fastify.put('/books', async (request, reply) => {
    const books = await db.query("update books set judul='KARLMAX' where book_id=2", [
      `%${request.body.search}%`
      ]);
    return books;
  })
 
fastify.delete('/books', async (request, reply) => {
    const books = await db.query("delete from books where book_id=6", [
      `%${request.body.search}%`
      ]);
    return books;
  })
 
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()