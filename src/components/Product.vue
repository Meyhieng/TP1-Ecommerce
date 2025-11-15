<template>
  <div class="product-card">
    <img :src="product.image" alt="" class="thumbnail" />
    <h3>{{ product.name }}</h3>
    <p>Price: ${{ product.price }}</p>
  </div>
</template>

<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const props = defineProps<{
  product: Product;
}>();
</script>

<style scoped>
.product-card {
  width: 180px;
  border-radius: 10px;
  padding: 15px;
  background: white;
  box-shadow: 0 1px 4px #ccc;
}
.thumbnail {
  width: 100%;
  border-radius: 8px;
}
</style>
