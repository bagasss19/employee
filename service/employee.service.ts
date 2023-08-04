import * as fs from "fs";
import dotenv from 'dotenv';

dotenv.config();

function getManager(listEmployee:any ,employee:any, managerName:string[]=[]) {
    const manager = listEmployee.filter(function (listEmployee:any) {
        return listEmployee.id == employee[0].managerId;
    })
    managerName.push(manager[0].name)
    if (manager[0].managerId != null) {
     getManager(listEmployee, manager, managerName)
    }

    return managerName
}

function checkDuplicate(employee:any) {
    var valueArr = employee.map(function(item:any){ return item.id });
    var isDuplicate = valueArr.some(function(item:any, idx:any){ 
    return valueArr.indexOf(item) != idx 
    });
    return isDuplicate
}
function checkMultipleManager(employee:any):Boolean {
        if (employee[0].name === employee[1].name && employee[0].managerId !== employee[1].managerId) {
            return false
        }
        return true
}


class EmployeeService {
    SearchEmployee(search: string): string|{error?: string} {
        // read file
        // const fileJson = fs.readFileSync("./correct-employees.json")
        // const fileJson = fs.readFileSync("./faulty-employees.json")
        const fileJson = fs.readFileSync("./another-faulty-employees.json")
        // parsing the JSON content
        const data = JSON.parse(fileJson.toString());

        // filter by name
        const employee = data.filter(function (employee:any) {
            return employee.name == search;
        })

        // Return Error when no employee found
        if (employee.length == 0) {
           return  {error:'no employee found'}
        }

        // Check possibility duplicate data & multiple manager
        if (employee.length > 1) {
            if (checkDuplicate(employee)) {
                return  {error:'duplicate data'}
            } else if (!checkMultipleManager(employee)) {
                return  {error:'multiple manager'}
            }
        }

        // If the employee is not the highest manager, they should have manager
        if (employee[0].managerId == null && employee[0].id != 1) {
            return {error:'employee dont have manager'}
        }

        // If the employee is the highest manager, no need to search their manager
        if (employee[0].id == 1) {
            return employee[0]
        }

        const managerName = getManager(data, employee)
        employee[0].managerName = managerName
        return employee[0]

  }
}

export default new EmployeeService();