<template>
  <div class="home">
    <FormComp form-type="Login" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import FormComp from "@/components/FormComp.vue";

defineComponent({
  name: "HomeView",
  components: {
    FormComp,
  },
});
</script>
