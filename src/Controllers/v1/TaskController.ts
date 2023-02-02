import { Request, Response } from 'express'

import ControllerDecorator from '@app/Decorators/ControllerDecorator'
import TaskService from '@app/Services/TaskService'

@ControllerDecorator
class TaskController {

  /**
   * 
   * @param request : Object
   * @param response : Object
   * 
   * it returns the tasks list according to the query
   * parameters passed to the server by the client, if no
   * parameter is passed it sends all the tasks data
   */
  public async index(request: Request, response: Response) {
    const { page, size } = request.query
    const tasks = await TaskService.allWithConditions(
      {
        offset: page ? Number(page) : 0,
        limit: page ? Number(size) : null
      }
    )
    response.json(tasks)
  }

  public async store(request: Request, response: Response) {
    const payload = request.body
    const task = await TaskService.store(payload)
    response.json({ data: task })
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params
    const task = await TaskService.findOrFail(id)
    response.json({ data: task })
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params
    const payload = request.body
    const task = await TaskService.update(id, payload)
    response.json({ data: task })
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params
    await TaskService.delete(id)
    response.json({ success: true })
  }

  public async statusList(request: Request, response: Response) {
    response.json({ statuses: ['NEW', 'IN PROGRESS', 'DONE'] })
  }
}

export default new TaskController()
