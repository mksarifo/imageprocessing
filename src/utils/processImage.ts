import path from 'path';
import sharp from 'sharp';
import { image_path, thumb_path } from './constants';

export const options = {
  root: path.join(__dirname.slice(0, -6), thumb_path),
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
};

export const resize = (
  fileName: string,
  outFileName: string,
  width: string,
  height: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function
): void => {
  sharp(`${__dirname.slice(0, -6)}${image_path}${fileName}.jpg`)
    .resize(parseInt(width), parseInt(height))
    .toFile(
      `${__dirname.slice(0, -6)}/${thumb_path}${outFileName}.jpg`,
      (err, info) => {
        callback(err, info);
      }
    );
};
