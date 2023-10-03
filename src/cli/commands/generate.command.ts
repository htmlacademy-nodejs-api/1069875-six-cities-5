import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { MockServerData } from '../../shared/types/index.js';
import { Command } from './command.interface.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import got from 'got';

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, count: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < count; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
