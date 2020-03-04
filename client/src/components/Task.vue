<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item listItem h5">
      {{taskData.title}}
      <button
        type="button"
        class="btn btn-info rounded-circle"
        data-toggle="modal"
        :data-target="'#commentModal'+taskData.id"
      >
        <i class="fas fa-comment"></i>
      </button>

      <div
        class="modal fade bd-example-modal-sm"
        :id="'commentModal'+taskData.id"
        tabindex="-1"
        role="dialog"
        aria-labelledby="mySmallModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
          <div class="modal-content gradient">
            <h5 class="text-green pl-1 mt-2">
              <u>Comments</u>
            </h5>
            <ul class="list-group list-group-flush m-2">
              <li
                class="list-group-item listItem row"
                v-for="(commentObj) in comments"
                :key="commentObj.body"
              >
                <p class="col-12 text-right text-danger">X</p>
                <h5 class="col-12">{{commentObj.body}}</h5>
                <p class="col-12 text-right">-{{commentObj.author}}</p>
              </li>
              <div v-if="newCommentForm">
                <div class="bg-info p-2 m-3">
                  <form @submit="addCommentToList">
                    <input
                      class="my-2"
                      type="text"
                      name="newCommentBody"
                      id="newCommentBody"
                      v-model="newComment.body"
                      placeholder="Enter new comment..."
                    />
                    <input
                      class="my-2"
                      type="text"
                      name="newCommentAuthor"
                      id="newCommentAuthor"
                      v-model="newComment.author"
                      placeholder="Enter your name..."
                    />
                    <button
                      type="submit"
                      class="fas fa-comment-medical text-success float-right m-3 addbutton"
                    ></button>
                  </form>
                </div>
              </div>
            </ul>
            <i
              v-if="!newCommentForm"
              @click="newCommentForm=true"
              class="fas fa-comment-medical text-warning float-right m-3"
            ></i>
            <i
              v-if="newCommentForm"
              @click="newCommentForm=false"
              class="fas fa-comment-slash text-danger float-right m-3"
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
      newCommentForm: false,
      newComment: {}
    };
  },
  methods: {
    addCommentToList() {
      this.$store.dispatch("addComment", this.newComment, this.taskData.id);
    },
    deleteComment() {
      this.$store.dispatch(
        "deleteComment",
        this.newComment._id,
        this.taskData.id
      );
    }
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
.gradient {
  background-image: linear-gradient(
    to top right,
    rgb(120, 248, 248),
    rgb(90, 252, 139)
  );
}
.addbutton {
  background-color: transparent;
  border: transparent;
}
</style>