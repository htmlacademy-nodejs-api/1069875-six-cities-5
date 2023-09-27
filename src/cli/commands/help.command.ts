import { Command } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {

  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.

        Пример:
            ${chalk.cyan('cli.js --<command> [--arguments]')}

        Команды:
            ${chalk.cyan('--version')}:                    # ${chalk.dim('выводит номер версии')}
            ${chalk.cyan('--help')}:                       # ${chalk.dim('печатает этот текст')}
            ${chalk.cyan('--import <path>')}:              # ${chalk.dim('импортирует данные из TSV')}
            ${chalk.cyan('--generate <n> <path> <url>')}:  # ${chalk.dim('генерирует произвольное количество тестовых данных')}
    `);
  }
}
