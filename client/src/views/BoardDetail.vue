<template>
  <div class="boardDetail">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
    <div class="row list-row m-2">
      <list v-for="(listObj) in lists" :key="listObj._id" :listData="listObj" />
    </div>
  </div>
</template>

<script>
import list from "@/components/List";

export default {
  name: "boardDetail",
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
    }
  },
  props: ["boardId"],
  components: {
    list
  }
};
</script>

<style scoped>
.list-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
