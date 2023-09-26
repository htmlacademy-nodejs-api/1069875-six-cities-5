import { Command } from './commands/command.interface.js';

export class CLIApplication {
  private commands: Record<string, Command> = {};

  public registeredCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      const commandName = command.getName();

      if (Object.hasOwn(this.commands, commandName)) {
        throw new Error(`Command ${commandName} is already registered`);
      }

      this.commands[commandName] = command;
    });
  }
}
