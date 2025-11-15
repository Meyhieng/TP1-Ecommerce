<!-- <script>
import axios from "axios";
import { useProductStore } from "./stores/product";
import Promotion from "./components/promotion.vue";
import Category from "./components/category.vue"; -->

// export default {
//   components: {
//     Promotion,
//     Category,
//   },
//   data() {
//     return {
//       categories: [],
//       promotions: [],
//     };
//   },

//   methods: {
//     fetchCategories() {
//       axios
//         .get("http://localhost:3000/api/categories")
//         .then((response) => {
//           this.categories = response.data;
//           console.log("Categories loaded:", this.categories);
//         })
//         .catch((err) => {
//           console.log("Error loading categories:", err);
//         });
//     },

//     fetchPromotions() {
//       axios
//         .get("http://localhost:3000/api/promotions")
//         .then((response) => {
//           this.promotions = response.data;
//           console.log("Promotions loaded:", this.promotions);
//         })
//         .catch((err) => {
//           console.log("Error loading promotions:", err);
//         });
//     },
//   },

//   mounted() {
//     this.fetchCategories();
//     this.fetchPromotions();
//   },
// };

export default {
  setup() {
    const store = useProductStore();

    const loadAllData = async () => {
      try {
        const [groups, promotions, categories, products] = await Promise.all([
          axios.get("http://localhost:3000/api/groups"),
          axios.get("http://localhost:3000/api/promotions"),
          axios.get("http://localhost:3000/api/categories"),
          axios.get("http://localhost:3000/api/products"),
        ]);

        store.setGroups(groups.data);
        store.setPromotions(promotions.data);
        store.setCategories(categories.data);
        store.setProducts(products.data);
      } catch (err) {
        console.log("Error loading data:", err);
      }
    };

    loadAllData();

    return { store };
  },
};

<!-- </script> -->




<script setup lang="ts">
import axios from "axios";
import { computed, ref } from "vue";
import { useProductStore } from "./stores/product";

import Promotion from "./components/promotion.vue";
import Category from "./components/category.vue";
import Menu from "./components/Menu.vue";
import Product from "./components/Product.vue";

const store = useProductStore();

const currentGroup = ref("Group A");

const loadAllData = async () => {
  try {
    const [groups, promotions, categories, products] = await Promise.all([
      axios.get("http://localhost:3000/api/groups"),
      axios.get("http://localhost:3000/api/promotions"),
      axios.get("http://localhost:3000/api/categories"),
      axios.get("http://localhost:3000/api/products"),
    ]);

    store.setGroups(groups.data);
    store.setPromotions(promotions.data);
    store.setCategories(categories.data);
    store.setProducts(products.data);
  } catch (err) {
    console.log("Error loading data:", err);
  }
};

loadAllData();

// Computed getters
const categoriesByGroup = computed(() =>
  store.getCategoriesByGroup(currentGroup.value)
);

const productsByGroup = computed(() =>
  store.getProductsByGroup(currentGroup.value)
);

const popularProducts = computed(() => store.getPopularProducts());
</script>

<template>
  <!-- GROUP MENU -->
  <Menu
    :groups="store.groups"
    v-model="currentGroup"
  />

  <!-- CATEGORIES BY GROUP -->
  <div class="category">
    <Category
      v-for="(cat, index) in categoriesByGroup"
      :key="index"
      class="box"
      :imgScr="cat.imgScr"
      :catName="cat.catName"
      :quantity="cat.quantity"
      :cardColor="cat.cardColor"
    />
  </div>

  <!-- PROMOTION LIST -->
  <div class="promotion">
    <Promotion
      v-for="(promo, index) in store.promotions"
      :key="index"
      class="box"
      :promoText="promo.promoText"
      :promoImg="promo.promoImg"
      :promoColor="promo.promoColor"
      :btnColor="promo.btnColor"
    />
  </div>

  <!-- POPULAR PRODUCTS -->
  <h2 style="margin-left: 20px">🔥 Popular Products</h2>
  <div class="products">
    <Product
      v-for="(p, index) in popularProducts"
      :key="index"
      :product="p"
    />
  </div>

  <!-- PRODUCTS BY SELECTED GROUP -->
  <h2 style="margin-left: 20px">🛒 Products in {{ currentGroup }}</h2>
  <div class="products">
    <Product
      v-for="(p, index) in productsByGroup"
      :key="index"
      :product="p"
    />
  </div>
</template>

<style scoped>
.category,
.promotion,
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}
</style>
