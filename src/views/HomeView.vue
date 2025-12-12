<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Promotion from '../components/Promotion.vue'
import Category from '../components/Category.vue'
import Menu from '../components/Menu.vue'
import Product from '../components/Product.vue'
import ShowCase from '../components/ShowCase.vue'
import Header from '../components/Header.vue'
import { useProductStore } from '@/store/useProductStore'
import { storeToRefs } from 'pinia'

const currentGroupName = ref('Group A')

const store = useProductStore()

// Using storeToRefs to maintain reactivity
const { getPromotions, getCategories, getPopularProducts } = storeToRefs(store)

const promotions = computed(() => getPromotions.value)
const categories = computed(() => getCategories.value)
const popularProducts = computed(() => getPopularProducts.value)

const productsByGroup = computed(() => {
  return store.getProductsByGroup(currentGroupName.value)
})

onMounted(() => {
  store.loadAll()
})
</script>

<template>
  <div>
    <Header></Header>
    <ShowCase></ShowCase>
    <Menu title="Featured Categories"></Menu>

    <!-- CATEGORY LIST -->
    <router-link to="/Products">
      <div class="category">
        <Category
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </div>
    </router-link>
    
    <!-- PROMOTION LIST -->
    <router-link to="/Products">
      <div class="promotion">
        <Promotion
          v-for="promotion in promotions"
          :key="promotion.id"
          :promotion="promotion"
        />
      </div>
    </router-link>
    
    <Menu title="Popular Products"></Menu>
    
    <!-- PRODUCTS LIST -->
    <div class="products">
      <Product
        v-for="product in popularProducts"
        :key="product.id"
        v-bind="product"
      />
    </div>
  </div>
</template>

<style scoped>
.category,
.promotion,
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 12px;
}
</style>