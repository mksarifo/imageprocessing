import fs from 'fs';
import sharp from 'sharp';
import { thumb_path } from '../../utils/constants';
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
        console.log(err);
      });
    }
  } catch (err) {
    console.error(err);
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
