import express from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import { config } from "dotenv";
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';
import bodyparser from 'body-parser';
import cors from 'cors';
import User from './models/User.js';
import isAuth from './middleware/isAuth.js';

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.SECRET_PRIVATE_KEY;

const corsOptions = {
  origin: process.env.FRONTEND_DOMAIN, // Replace with your frontend domain
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies and credentials
  optionsSuccessStatus: 204
};

app.use(express.json());
app.use(cookieParser());
// app.use(cors(corsOptions));
app.use('*', cors({
  origin: true,
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_LINK)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send({ "message": "Home route" })
})

// Registration route
app.post('/api/register', async (req, res) => {
  const { name, dateOfBirth, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      dateOfBirth,
      email,
      password: await bcryptjs.hash(password, 10)
    });

    await user.save();
    const token = jsonwebtoken.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 3600000 // 1 hour in milliseconds
    });
    res.json({ token, user: { id: user._id, name, dateOfBirth, email } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jsonwebtoken.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000 // 1 hour in milliseconds
    });
    res.json({ token, user: { id: user._id, name: user.name, dateOfBirth: user.dateOfBirth, email } });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// logout route
app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure this matches how the cookie was set
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// Get user data for table
app.get('/api/userData', isAuth, (req, res) => {
  res.status(200).json({
    data: [
      {
        "id": 1,
        "name": "Michael Holz",
        "date_created": "04/10/2013",
        "role": "Admin",
        "status": "Inactive"
      },
      {
        "id": 2,
        "name": "Paula Wilson",
        "date_created": "05/08/2014",
        "role": "Publisher",
        "status": "Active"
      },
      {
        "id": 3,
        "name": "Antonio Moreno",
        "date_created": "11/05/2015",
        "role": "Publisher",
        "status": "Suspended"
      },
      {
        "id": 4,
        "name": "Mary Saveley",
        "date_created": "06/09/2016",
        "role": "Reviewer",
        "status": "Active"
      },
      {
        "id": 5,
        "name": "Martin Sommer",
        "date_created": "12/08/2017",
        "role": "Moderator",
        "status": "Inactive"
      }
    ]
  });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
