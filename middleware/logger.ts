import { createLogger, transports, format, Logger } from "winston"
import LokiTransport from "winston-loki"
import { Request, Response, NextFunction } from "express";

let logger: Logger
 
const initializeLogger = () => {
  if (logger) {
    return
  }
 
  logger = createLogger({
    transports: [new LokiTransport({
        host: "http://host.docker.internal:3100",
        labels: { app: 'employee'},
        json: true,
        format: format.json(),
        replaceTimestamp: true,
        onConnectionError: (err) => console.error(err)
      }),
      new transports.Console({
        format: format.combine(format.simple(), format.colorize())
      })]
  })
}
 
export const getLogger = () => {
  initializeLogger()
  return logger
}

export const logTrack = (req: Request, res: Response, next: NextFunction) => {
  const logger = getLogger()
  let method = req.method
  let url = req.url
  let status = res.statusCode
  let oldSend = res.send
  res.send = function(data) {
      res.send = oldSend
      logger.info({ message: `method=${method} url=${url} status=${status} time=${Date.now()}`, labels: { 'origin': 'api' }, response : data })
      return res.send(data)
  }

  next()
}