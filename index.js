import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./models/User.js";
dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.sub);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send("Error registering user: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { password, email, username } = req.body;
  try {
    const user = await User.findOne({ username: username, email: email });
    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ sub: user.id }, "secret", { expiresIn: "1h" }); // Token with user ID
    res.json({ token });
  } catch (err) {
    res.status(500).send("Error logging in: " + err.message);
  }
});

// Protected route
app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: `Hello, ${req.user.username}! You are authorized.` });
  }
);

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

app.get("/info", (req, res) => {
  res.status(200).send({
    body: "Hello World",
  });
  console.log("Response sent successfully!");
});
