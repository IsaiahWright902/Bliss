<template>
  <div class="card mb-3 mx-1 col-12 col-md-3 border border-dark gradient">
    <h3 class="card-header">
      {{listData.title}}
      <a class="text-danger float-right">X</a>
    </h3>
    <task v-for="(taskObj) in tasks" :key="taskObj._id" :taskData="taskObj" />
    <div class="card-body">
      <button class="btn btn-sm btn-outline-dark">Add Task</button>
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
      this.$store.dispatch("getTaskByList", this.listData.id);
    }
  },
  mounted() {
    this.getTasksByList;
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  components: {
    task
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