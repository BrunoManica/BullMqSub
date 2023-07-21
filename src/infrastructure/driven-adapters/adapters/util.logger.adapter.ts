import moment from 'moment-timezone'
import tracer from 'dd-trace'
import formats from 'dd-trace/ext/formats'
import config from 'src/application/config/config'

import winston, { createLogger, format, transports } from 'winston'
import { IUtilLogger } from 'src/domain/models/contracts/util.logger'

export class UtilLoggerAdapter implements IUtilLogger {
  private readonly appendTimestamp: winston.Logform.FormatWrap
  private readonly logFormatConsole: winston.Logform.Format
  private readonly logFormatFile: winston.Logform.Format
  private readonly transportConsole: transports.ConsoleTransportInstance
  private readonly transportFile: transports.FileTransportInstance
  private logger: winston.Logger

  constructor() {
    this.appendTimestamp = format((info, opts) => {
      if (opts.tz) {
        info.timestamp = moment().tz(opts.tz).format('DD-MM-YYYY HH:mm:ss')
      } else {
        info.timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
      }

      return info
    })

    this.logFormatConsole = format.combine(
      //format.colorize(),
      format.splat(),
      this.appendTimestamp(),
      format.align(),
      format.printf(info => {
        const span = tracer.scope().active()
        const time = new Date().toISOString()
        const record = {
          time: info.timestamp,
          level: info.level,
          message: info.message,
        }
        if (span) {
          tracer.inject(span.context(), formats.LOG, record)
        }
        return JSON.stringify(record)
      }),
    )

    this.logFormatFile = format.combine(
      format.splat(),
      this.appendTimestamp(),
      format.align(),
      format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`),
    )

    this.transportFile = new transports.File({
      maxsize: 5485760,
      maxFiles: 7,
      filename: `./logs/application.log`,
      format: this.logFormatFile,
      level: config.LOG_LEVEL,
    })

    this.transportConsole = new transports.Console({
      format: this.logFormatConsole,
      level: config.LOG_LEVEL,
    })

    this.logger = createLogger({
      transports: [this.transportConsole, this.transportFile],
    })
  }

  public warn(message: string) {
    this.logger.warn(message)
  }

  public info(message: string) {
    this.logger.info(message)
  }

  public debug(message: string) {
    this.logger.debug(message)
  }

  public error(message: string) {
    this.logger.error(message)
  }
}
