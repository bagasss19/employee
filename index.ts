import express, { Express, Request, Response } from 'express';
import { getLogger, logTrack } from './middleware/logger';
import EmployeeController from './controller/employee.controller';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const logger = getLogger()

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./dist/*.js'], // Path to the API routes with Swagger annotations
};

const specs = swaggerJsdoc(options);

app.use(logTrack)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

/**
 * @swagger
 * /employee/{name}:
 *      get:
 *          summary: Send the text to the server
 *          tags:
 *              - Employee
 *          description: Search employee by name
 *          parameters:
 *              - in: path
 *                name: name
 *                required: true
 *                description: name of the employee to retrieve.
 *                schema:
 *                  type: string
 *          responses:
 *              200:
 *                  description: return array of employee
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  name:
 *                                      type: string
 *                                      description: employee name
 *                                      example: john
 *                                  text:
 *                                      type: string
 *                                      example: This is some example string!
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */
app.get('/employee/:name', EmployeeController.SearchEmployee);

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`)
});