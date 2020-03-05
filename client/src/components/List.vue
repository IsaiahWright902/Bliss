<template>
  <div class="card mb-3 mx-1 col-12 col-md-3 border border-dark gradient">
    <h3 class="card-header">
      {{listData.title}}
      <a @click="deleteList(listData.id)" class="text-danger float-right">X</a>
    </h3>
    <div :id="listData.id" @dragover.prevent="removeTask" @drop.prevent="moveTask">
      <task v-for="(taskObj) in tasks" :key="taskObj._id" :taskData="taskObj" />
    </div>
    <div class="card-body">
      <button
        data-toggle="modal"
        :data-target="'#addTaskModal'+listData.id"
        class="btn btn-sm btn-outline-dark"
      >Add Task</button>
    </div>
    <div class="modal" :id="'addTaskModal'+listData.id">
      <div class="modal-dialog" role="document">
        <div class="modal-content gradient">
          <div class="modal-header">
            <h5 class="modal-title">New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addTask">
              <input
                type="text"
                placeholder="Enter New Task Here..."
                rows="1"
                class="col-12"
                v-model="newTask.title"
              />

              <button type="submit" class="btn btn-success" data-dimiss="modal">Add Task</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import task from "@/components/Task";

export default {
  name: "List",
  props: ["listData"],
  methods: {
    getTasksByList() {
      this.$store.dispatch("getTasksByListId", this.listData.id);
    },
    addTask() {
      this.$store.dispatch("addTaskToList", this.newTask);
      this.getTasksByList();
    },
    deleteList(id) {
      let boardId = this.$route.params.boardId;
      this.$store.dispatch("deleteListByListId", { id: id, boardId: boardId });
    },
    removeTask() {
      console.log("dragOver");
    },
    moveTask() {
      console.log("drop");
      console.log("move task");
      console.log("move task new list id" + this.listData.id);
      let taskId = this.$store.state.activeTask.taskId;
      let oldList = this.$store.state.activeTask.oldList;
      let listId = this.listData.id;
      let boardId = this.$route.params.boardId;
      this.$store.dispatch("moveTask", {
        taskId: taskId,
        listId: listId,
        boardId: boardId,
        oldList: oldList,
        body: {
          listId: listId
        }
      });
      this.getTasksByList;
    }
  },
  mounted() {
    this.getTasksByList();
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listData.id];
    }
  },
  components: {
    task
  },
  data() {
    return {
      newTask: {
        title: "",
        listId: this.listData.id,
        creatorEmail: this.listData.creatorEmail
      }
    };
  }
};
</script>

<style scoped>
.gradient {
  background-image: linear-gradient(to bottom right, teal, rgb(110, 211, 84));
}
a {
  cursor: pointer;
}
</style>