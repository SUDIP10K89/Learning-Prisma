import express from 'express';
import { PrismaClient } from './generated/prisma/client.js';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new user
app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email }
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create a post for a user
app.post('/posts', async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } }
      }
    });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts with authors
app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true }
  });


  res.json(posts);
});

app.listen(3000, () => console.log('Server running on port 3000'));
