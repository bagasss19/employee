import { Request, Response, NextFunction } from "express";
import EmployeeService from '../service/employee.service';

class EmployeeController {
    async SearchEmployee(req: Request, res: Response, next: NextFunction) {
      try {
        const data = await EmployeeService.SearchEmployee(req.params.name)
        return res.status(200).send(data);
      } catch (error) {
        return res.status(500).send(error);
      }
    }
  }

export default new EmployeeController();