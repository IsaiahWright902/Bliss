<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{{taskData.title}}</li>
  </ul>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData"]
};
</script>

<style>
</style>