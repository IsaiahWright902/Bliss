import express from 'express'
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { taskService } from '../services/TaskService'



//PUBLIC
export class TaskController extends BaseController {
  constructor() {
    super("api/tasks")
    this.router = express.Router()
      .use(auth0provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .put('/:id/comment', this.addComment)
      .put("/:id/removeComment", this.removeComment)
      .delete('/:id', this.delete)

  }

  async create(req, res, next) {
    try {
      req.body.creatorEmail = req.userInfo.email
      let data = await taskService.create(req.body)
      return res.status(201).send(data)
    } catch (error) { next(error) }
  }

  async edit(req, res, next) {
    try {
      let data = await taskService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }
  async addComment(req, res, next) {
    try {
      let data = await taskService.addComment(req.params.id, req.body)
      return res.send(data)
    } catch (error) { next(error) }
  }

  async removeComment(req, res, next) {
    try {
      let data = await taskService.removeComment(req.params.id, req.body);
      res.send(data);
    } catch (error) { next(error) }
  }

  async delete(req, res, next) {
    try {
      await taskService.delete(req.params.id, req.userInfo.email)
      return res.send("Successfully deleted")
    } catch (error) { next(error) }
  }
}


