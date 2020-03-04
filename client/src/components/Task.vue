<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item listItem h5">
      {{taskData.title}}
      <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
        <div class="btn-group dropleft" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            class="btn btn-outline-info rounded-circle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fas fa-comment"></i>
          </button>
          <div id="dropdown" class="dropdown-menu showme" aria-labelledby="btnGroupDrop1">
            <h5 class="text-green pl-1">
              <u>Comments</u>
            </h5>
            <ul class="list-group list-group-flush m-2">
              <li
                class="list-group-item listItem row"
                v-for="(commentObj) in comments"
                :key="commentObj.body"
              >
                <h5 class="col-12">{{commentObj.body}}</h5>
                <p class="col-12 text-right">-{{commentObj.author}}</p>
              </li>
              <div v-if="newCommentForm">
                <input type="text" name="newComment" id="newComment" />
              </div>
            </ul>
            <i
              @click="newCommentForm=true"
              class="fas fa-comment-medical text-warning float-right mx-3"
            ></i>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData"],
  computed: {
    comments() {
      return this.taskData.comments;
    }
  },
  data() {
    return {
      newCommentForm: false
    };
  }
};
</script>

<style scoped>
.listItem {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  background-color: transparent;
  align-items: baseline;
}
.showme {
  overflow: visible !important;
  height: fit-content;
  position: absolute;
  z-index: 900;
  width: 15rem;
}

.list-group {
  overflow: visible;
  background-color: transparent;
}
i {
  cursor: pointer;
}
</style>