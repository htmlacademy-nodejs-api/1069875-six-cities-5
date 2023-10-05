import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Command } from './command.interface.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompletedImport(count: number) {
    console.info(chalk.magenta(`${count} rows imported.`));
  }

  public getName(): string {
    return '--import';
  }

  public execute(...params: string[]): void {
    const [filename] = params;
    const fileReader = new TSVFileReader(filename);

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompletedImport);

    try {
      fileReader.read();
    } catch (err) {
      console.error(chalk.red(`Can't import data from file: ${filename}`));
      console.error(chalk.red(getErrorMessage(err)));
    }
  }
}
