import { createLogger, transports, format } from 'winston';

export const setLogLevel = (logLevel: string) => {
	logger.level = logLevel;
};


export function exitProcess(exitCode: number): void {
	process.exit(exitCode);
  }
  