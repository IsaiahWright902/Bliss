<template>
  <div class="boardDetail">
    <h1 v-if="board.title" class="text-info welcome-text">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <button
      class="btn mx-auto btn-block btn-info col-12 col-md-3"
      data-toggle="modal"
      data-target="#addListModal"
    >Add List</button>
    <div class="row list-row m-2">
      <list v-for="(listObj) in lists" :key="listObj._id" :listData="listObj" />
    </div>
    <div class="modal" id="addListModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content gradient">
          <div class="modal-header">
            <h5 class="modal-title">New List</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addList">
              <input
                v-model="newList.title"
                type="text"
                placeholder="Enter New List Here..."
                rows="1"
                class="col-12"
              />
              <button type="submit" class="btn btn-success">Save changes</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import list from "@/components/List";

export default {
  name: "boardDetail",
  data() {
    return {
      newList: {}
    };
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    }
  },

  mounted() {
    if (!this.$store.state.boards.length) {
      this.$store.dispatch("getBoardById", this.$route.params.boardId);
    } else {
      this.setActiveBoard();
    }
    this.getListsByBoardId();
  },
  methods: {
    setActiveBoard() {
      this.$store.dispatch("setActiveBoard", this.$route.params.boardId);
    },
    getListsByBoardId() {
      this.$store.dispatch("getListsByBoardId", this.$route.params.boardId);
    },
    addList() {
      let body = {
        title: this.newList.title,
        boardId: this.$route.params.boardId
      };
      this.$store.dispatch("addListByBoardId", body);
    }
  },
  props: ["boardId"],
  components: {
    list
  }
};
</script>

<style scoped>
.gradient {
  background-image: linear-gradient(
    to bottom left,
    rgb(52, 160, 160),
    rgb(131, 241, 104)
  );
}
.list-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.welcome-text {
  background-color: rgba(0, 0, 0, 0.699);
  border-radius: 10%;
}
</style>
