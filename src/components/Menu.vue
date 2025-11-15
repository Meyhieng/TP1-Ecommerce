<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  groups: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);


function selectGroup(name: string) {
  emit("update:modelValue", name);
}
</script>

<template>
  <div class="menu">
    <button
      v-for="g in groups"
      :key="g.id"
      :class="{ active: g.name === modelValue }"
      @click="selectGroup(g.name)"
    >
      {{ g.name }}
    </button>
  </div>
</template>

<style scoped>
.menu {
  display: flex;
  gap: 10px;
  padding: 10px;
}

button.active {
  background: black;
  color: white;
}

button {
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #aaa;
  cursor: pointer;
}
</style>
