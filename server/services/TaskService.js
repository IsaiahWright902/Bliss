import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class TaskService {

  async getTasksByListId(id) {
    let data = await dbContext.Tasks.find({ listId: id })
    if (!data) {
      throw new BadRequest("Invalid")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Tasks.create(rawData)
    return data
  }
  async addComment(id, update) {
    let data = await dbContext.Tasks.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          comments: { $each: update.comments }
        }
      },
      { new: true }
    )

    if (!data) {
      throw new BadRequest("Invalid");
    }
    return data;
  }


  async edit(id, userEmail, update) {
    let data = await dbContext.Tasks.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async delete(id, userEmail) {
    let data = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

}


export const taskService = new TaskService()