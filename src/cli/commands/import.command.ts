import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Logger, ConsoleLogger } from '../../shared/libs/logger/index.js';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer/index.js';
import { DefaultUserService, UserModel, UserService } from '../../shared/modules/user/index.js';
import { Command } from './command.interface.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.const.js';
import { Offer } from '../../shared/types/index.js';
import chalk from 'chalk';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompletedImport = this.onCompletedImport.bind(this);

    this.logger = new ConsoleLogger();
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompletedImport(count: number) {
    console.info(chalk.magenta(`${count} rows imported.`));
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({ ...offer.host, password: DEFAULT_USER_PASSWORD}, this.salt);
    await this.offerService.create({ ...offer, hostId: user.id });
  }

  public getName(): string {
    return '--import';
  }

  public execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): void {
    this.salt = salt;

    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.databaseClient.connect(uri);

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
