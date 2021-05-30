declare global {
  namespace NodeJS {
    interface ProcessEnv {
      LOG_LEVEL?:
        | "EMERG"
        | "ALERT"
        | "CRIT"
        | "ERROR"
        | "WARNING"
        | "NOTICE"
        | "INFO"
        | "DEBUG";
      NODE_ENV: string;
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
