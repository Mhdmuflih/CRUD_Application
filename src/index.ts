import express from 'express';
import mongoose from 'mongoose';
import router from './router/userRounter';

const app = express();

app.use(express.json());
app.use(express.static('public'));

// Mongoose connection
mongoose.connect('mongodb://localhost:27017/student_management_typescript').then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/users', router);

const port = 4000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
