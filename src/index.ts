import express from "express";
import Cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import sharp from "sharp";
import path from "path";
import validate from "./middleware/validate.middleware";
import cache from "./middleware/cache.middleware";

const app = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(Cors({ origin: "*" }));
app.use(helmet());
app.use(morgan("tiny"));

app.get("/", function (req, res) {
  res.send("hello world");
});

app.get("/api/image/:name", validate, cache, function (req, res) {
  const fileName = req.params.name;
  const sizes: { height: string; width: string } = {
    height: req.query.height as string,
    width: req.query.width as string,
  };
  const outFileName = `${fileName}${sizes.height}x${sizes.width}`;
  try {
    var options = {
      root: path.join(__dirname, "public/assets/thumb/"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };
    sharp(`${__dirname}/public/assets/image/${fileName}.jpg`)
      .resize(parseInt(sizes.width), parseInt(sizes.height))
      .toFile(
        `${__dirname}/public/assets/thumb/${outFileName}.jpg`,
        (err, info) => {
          if (info) {
            res.sendFile(`${outFileName}.jpg`, options, function (error) {
              console.log(error);
            });
          }
          if (err) {
            res.status(404).send({ message: "image requested wasn't found" });
          }
        }
      );
  } catch (error) {
    res
      .status(500)
      .send({ message: "there was an error processing the image" });
  }
});

// Listener
app.listen(port, async () => {
  console.log(`listening on localhost: ${port}`);
});

export default app;
