import EmployeeService  from './employee.service';

describe('Testing Search Employee Function', () => {
    test('employee data is correct', () => {
        expect(EmployeeService.SearchEmployee("fletcher")).toEqual({"id": 2, "managerId": 1, "managerName": ["lori"], "name": "fletcher"})
    });

    test('search highest position employee', () => {
        expect(EmployeeService.SearchEmployee("lori")).toEqual({"id": 1, "managerId": null, "name": "lori"})
    });

    test('no employee found', () => {
      expect(EmployeeService.SearchEmployee("Gerard")).toEqual({"error": "no employee found"})
    });

    test('duplicate id', () => {
        expect(EmployeeService.SearchEmployee("linton")).toEqual({"error": "duplicate data"})
    });

    test('multiple manager', () => {
        expect(EmployeeService.SearchEmployee("tressa")).toEqual({"error": "multiple manager"})
    });

    test('employee dont manager', () => {
        expect(EmployeeService.SearchEmployee("keane")).toEqual({"error": "employee dont have manager"})
    });
  });