import {
  express,
  cors,
  dotenv,
  connectDB,
  passport,
  passportConfig,
  authRoutes,
  productRoutes,
} from "./Utils/index.js";

dotenv.config();
const port = process.env.PORT || 4000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

passportConfig();

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: `Hello, ${req.user}! You are authorized.` });
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
