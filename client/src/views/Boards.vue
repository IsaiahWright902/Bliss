<template>
  <div class="boards">
    <h1 class="text-info">Welcome to your boards!</h1>
    <button v-if="!form" @click="form=true" class="btn btn-info">New Board</button>
    <button v-if="form" @click="form=false" class="btn btn-warning">Cancel</button>
    <form class="my-2 mx-4 border border-info bg-info p-3" @submit.prevent="addBoard" v-if="form">
      <input class="col-4" type="text" placeholder="title" v-model="newBoard.title" required />
      <input class="col-6" type="text" placeholder="description" v-model="newBoard.description" />
      <button class="btn btn-success" type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board.id">
      <router-link :to="{name: 'boardDetail', params: {boardId: board.id}}">
        <div class="card text-center m-3 border border-info gradient">
          <div
            class="card-header bg-transparent border-bottom border-dark h3 text-dark"
          >{{board.title}}</div>
          <div class="card-body">
            <h5 class="card-title text-dark">{{board.description}}</h5>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
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
    }
  }
};
</script>

<style scoped>
.gradient {
  background-image: linear-gradient(to bottom right, teal, rgb(110, 211, 84));
}
</style>