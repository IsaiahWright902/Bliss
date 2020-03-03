<template>
  <div class="boardDetail">
    <h1 v-if="board.title">{{board.title}}</h1>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
export default {
  name: "boardDetail",
  computed: {
    board() {
      //FIXME This does not work on page reload because the activeBoard is empty in the store
      return this.$store.state.activeBoard;
    }
  },
  props: ["boardId"]
};
</script>
