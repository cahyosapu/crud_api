const fastify = require('fastify')({
  logger: true
})
 
const db = require('./db');
 
fastify.get('/books/:search', async (request, reply) => {
    const books = await db.query("select sku, judul from books where sku like $1", [
      `%${request.params.search}%`
      ]);
    return books;
  })
 
fastify.get('/books', async (request, reply) => {
    const books = await db.query("select * from books where sku = $1", [
      `%${request.query.search}%`
      ]);
    return books;
  })
 
fastify.post('/books/:idBooks', async (request, reply) => {
    const addBooks = request.body;
    const books = await db.query("INSERT INTO books (sku, judul, harga, stock) VALUES ('${addBooks.sku}','${addBooks.judul}','${addBooks.harga}','${addBooks.stock}');")
    return ("Sukses");
  })
 
fastify.put('/books/:idBooks', async (request, reply) => {
    const updateBooks = request.body;
    const books = await db.query("UPDATE books SET judul = '${updateBooks.judul}' WHERE judul = $1", [
      `%${request.body.search}%`
      ]);
    return ("Updated" + request.params.search);
  })
 
fastify.delete('/books/:search', async (request, reply) => {
    const books = await db.query("DELETE books WHERE sku = $1", [
      `%${request.body.search}%`
      ]);
    return ("Deleted" + request.params.search);
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