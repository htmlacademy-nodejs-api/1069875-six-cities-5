import { FileReader } from './file-reader.interface.js';
import { createReadStream } from 'node:fs';
import EventEmitter from 'node:events';

const CHUNK_SIZE = 16300;

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLineStart = -1;
    let importedRowsCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLineStart = remainingData.indexOf('\n')) >= 0) {
        const completedData = remainingData.slice(0, ++nextLineStart);
        remainingData = remainingData.slice(nextLineStart);
        importedRowsCount++;

        await new Promise((resolve) => {
          this.emit('line', completedData, resolve);
        });
      }
    }

    this.emit('end', importedRowsCount);
  }
}
