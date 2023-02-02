import { Request, Response } from 'express'

import ControllerDecorator from '@app/Decorators/ControllerDecorator'
import EmployeeService from '@app/Services/EmployeeService'
import TaskService from '@app/Services/TaskService'
import Task from '@app/Models/Task'

@ControllerDecorator
class EmployeeController {
  public async index(request: Request, response: Response) {
    const employees = await EmployeeService.all()
    response.json({ data: employees })
  }

  public async store(request: Request, response: Response) {
    const payload = request.body
    const employee = await EmployeeService.store(payload)
    response.json({ data: employee })
  }
/**
 * 
 * @param request : Object
 * @param response : Object
 * 
 * it takes the employee data and the new associated task to save
 * them in their respective tables with the necessary associations
 * and returns to the client as response a copy of the task and its 
 * owner
 */
  public async storeWithTask(request: Request, response: Response) {
    const { employee: employeeData, task: taskData } = request.body

    const employee = await EmployeeService.store(employeeData)
    const task = await TaskService.store({
      ...taskData,
      employee_id: employee.employee_id_number
    })

    response.json({ data: {
      ...employee,
      task: {
        ...task,
      }
    } })
  }
  public async show(request: Request, response: Response) {
    const { id } = request.params
    const employee = await EmployeeService.findOrFail(id)
    response.json({ data: employee })
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params
    const payload = request.body
    const employee = await EmployeeService.update(id, payload)
    response.json({ data: employee })
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params
    await EmployeeService.delete(id)
    response.json({ success: true })
  }

  public async tasks(request: Request, response: Response) {
    const { id } = request.params
    const employee = await EmployeeService.findOrFail(id)
    const tasks = await employee.$get('tasks')
    response.json({ data: tasks })
  }

  public async employeesWithtasks(request: Request, response: Response) {
    const employees = await EmployeeService.allWithConditions({
      include: [{
        model: Task,
      }],
    })
    response.json({ data: employees })
  }
}

export default new EmployeeController()
