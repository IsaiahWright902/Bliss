<template>
  <div class="boards">
    <h1 class="text-info welcome-text mt-1">Welcome to your boards!</h1>
    <button
      v-if="!form"
      @click="form=true"
      class="btn mx-auto btn-block btn-info col-12 col-md-3"
    >New Board</button>
    <button
      v-if="form"
      @click="form=false"
      class="btn mx-auto btn-block btn-warning col-12 col-md-3"
    >Cancel</button>
    <form class="my-2 mx-4 border border-info bg-info p-3" @submit.prevent="addBoard" v-if="form">
      <input class="col-4" type="text" placeholder="title" v-model="newBoard.title" required />
      <input class="col-6" type="text" placeholder="description" v-model="newBoard.description" />
      <button class="btn btn-success" type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board.id">
      <div class="card text-center m-3 border border-info gradient">
        <div class="card-header bg-transparent border-bottom border-dark h3 text-dark">
          <router-link
            :to="{name: 'boardDetail', params: {boardId: board.id}}"
            class="text-dark"
          >{{board.title}}</router-link>
        </div>
        <div class="card-body">
          <h5 class="card-title text-dark">{{board.description}}</h5>
          <button @click="deleteBoard(board.id)" class="btn btn-sm btn-danger float-right">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
        id: ""
      },
      form: false
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
      this.form = false;
    },
    deleteBoard(id) {
      Swal.fire({
        title: "Are you sure you want to delete this board?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        backdrop: `
      rgba(123, 0, 16, 0.4)
  `
      }).then(result => {
        if (result.value) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          this.$store.dispatch("deleteBoard", id);
        }
      });
    }
  }
};
</script>

<style scoped>
.gradient {
  background-image: linear-gradient(to bottom right, teal, rgb(110, 211, 84));
}
.welcome-text {
  background-color: rgba(0, 0, 0, 0.699);
  border-radius: 10%;
}
</style>