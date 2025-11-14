<script>
import axios from "axios";
import Promotion from "./components/promotion.vue";
import Category from "./components/category.vue";

export default {
  components: {
    Promotion,
    Category,
  },
  data() {
    return {
      categories: [],
      promotions: [],
    };
  },

  methods: {
    fetchCategories() {
      axios
        .get("http://localhost:3000/api/categories")
        .then((response) => {
          this.categories = response.data;
          console.log("Categories loaded:", this.categories);
        })
        .catch((err) => {
          console.log("Error loading categories:", err);
        });
    },

    fetchPromotions() {
      axios
        .get("http://localhost:3000/api/promotions")
        .then((response) => {
          this.promotions = response.data;
          console.log("Promotions loaded:", this.promotions);
        })
        .catch((err) => {
          console.log("Error loading promotions:", err);
        });
    },
  },

  mounted() {
    this.fetchCategories();
    this.fetchPromotions();
  },
};
</script>

<template>
  <!-- CATEGORY LIST -->
  <div class="category">
    <Category
      v-for="(cat, index) in categories"
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
      v-for="(promo, index) in promotions"
      :key="index"
      class="box"
      :promoText="promo.promoText"
      :promoImg="promo.promoImg"
      :promoColor="promo.promoColor"
      :btnColor="promo.btnColor"
    />
  </div>
</template>

<style scoped>
.category,
.promotion {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}
</style>
