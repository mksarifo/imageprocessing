import express from "express";
import path from "path";

const cache = function (
  req: express.Request,
  res: express.Response,
  next: Function
) {
  const fileName = req.params.name;
  const sizes: { height: string; width: string } = {
    height: req.query.height as string,
    width: req.query.width as string,
  };
  const outFileName = `${fileName}${sizes.height}x${sizes.width}`;
  const dir = __dirname.slice(0, -11);
  try {
    var options = {
      root: path.join(dir, "public/assets/thumb/"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };
    res.sendFile(`${outFileName}.jpg`, options, function (error) {
      if (error) {
        return next();
      }
    });
  } catch (error) {
    return next();
  }
};

export default cache;
