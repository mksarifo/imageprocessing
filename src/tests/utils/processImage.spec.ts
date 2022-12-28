import fs from 'fs';
import sharp from 'sharp';
import { image_path, thumb_path } from '../../utils/constants';
import { resize } from '../../utils/processImage';

const outFile = 'test';
const inFile = 'board';

beforeAll(() => {
  // Check if the file exists before running tests
  const path = `${__dirname.slice(0, -12)}/${thumb_path}${outFile}.jpg`;
  try {
    if (fs.existsSync(path)) {
      // File exists, delete it
      fs.unlink(path, (err) => {
        if (err) throw err;
      });
    }
    // Copy sample image to build directory
    fs.copyFile(
      `${__dirname.slice(0, -18)}/src/${image_path}/board.jpg`,
      `${__dirname.slice(0, -12)}/${image_path}/board.jpg`,
      (err) => {
        if (err) throw err;
      }
    );
  } catch (err) {
    console.error(err);
  }
});

// Perform Cleanup after tests are done
afterAll(() => {
  const testFile = `${__dirname.slice(0, -12)}/${thumb_path}${outFile}.jpg`;
  const sampleFile = `${__dirname.slice(0, -12)}/${image_path}/board.jpg`;

  try {
    if (fs.existsSync(testFile)) {
      // File exists, delete it
      fs.unlink(testFile, (err) => {
        if (err) throw err;
      });
    }
    if (fs.existsSync(sampleFile)) {
      // File exists, delete it
      fs.unlink(sampleFile, (err) => {
        if (err) throw err;
      });
    }
  } catch (error) {
    console.error(error);
  }
});

describe('Image Processor Tests', () => {
  it('Should resize to correct height', (done) => {
    resize(
      inFile,
      outFile,
      '100',
      '150',
      (err: Error, info: sharp.OutputInfo) => {
        expect(info.height).toEqual(150);
        done();
      }
    );
  });

  it('Should resize to correct width', (done) => {
    resize(
      inFile,
      outFile,
      '100',
      '150',
      (err: Error, info: sharp.OutputInfo) => {
        expect(info.width).toEqual(100);
        done();
      }
    );
  });

  it('Should output correct format', (done) => {
    resize(
      inFile,
      outFile,
      '100',
      '150',
      (err: Error, info: sharp.OutputInfo) => {
        expect(info.format).toEqual('jpeg');
        done();
      }
    );
  });
});
