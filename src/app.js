import express from "express";
const app = express();
import path from "path";
import route from "./routes/url.js";
import StaticRoute from "./routes/staticRoute.js"
import { URL } from "./models/url.js";
import { fileURLToPath } from "url";
import userRoute from './routes/user.js';
import cookieParser from "cookie-parser";
import { restrictTOLoggedinUserOnly} from "./middleware/auth.js"

// Create __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the view engine to EJS and ensure the correct views folder path
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Correct views path

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use(express.static("public"));
// routes
app.use("/url",restrictTOLoggedinUserOnly,route);
app.use("/",StaticRoute);
app.use('/user',userRoute);

app.get("/url/:shortID", async (req, res) => {
  try {
    // Access shortID from request params
    const ShortId = req.params.shortID;

    // Find the URL by shortID and update visit history
    const urlEntry = await URL.findOneAndUpdate(
      { ShortId },
      {
        $push: {
            VisitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    // If no URL is found, return a 404 response
    if (!urlEntry) {
      return res.status(404).json({ message: "URL not found" });
    }

    // Ensure the originalURL has 'http://' or 'https://'
    let originalURL = urlEntry.originalURL;
    if (!/^https?:\/\//i.test(originalURL)) {
      originalURL = "http://" + originalURL;
    }

    // Redirect the user to the original URL
    res.redirect(originalURL);
  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export { app };
