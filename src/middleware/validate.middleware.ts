import express from 'express';

const validate = function (
  req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/ban-types
  next: Function
) {
  const sizes: { height: number; width: number } = {
    height: req.query.height as unknown as number,
    width: req.query.width as unknown as number
  };

  if (sizes.height > 0 && sizes.width > 0) {
    return next();
  } else {
    return res
      .status(404)
      .send({ message: 'invalid input provided for width and heigth' });
  }
};

export default validate;
