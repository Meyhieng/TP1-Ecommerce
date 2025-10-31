<script setup lang="ts">

  import { ref } from 'vue'
  import Promotion from './components/promotion.vue'
  import Category from './components/category.vue'



  const catDatas = ref([
    { imgScr: "/CategoriesItem/Cat1.png", catName: "Cake & Milk", quantity: 14, cardColor: "#F2FCE4" },
    { imgScr: "/CategoriesItem/Cat2.png", catName: "Peach", quantity: 17, cardColor: "#FFFCEB" },
    { imgScr: "/CategoriesItem/Cat3.png", catName: "Organic Kiwi", quantity: 21, cardColor: "#ECFFEC" },
    { imgScr: "/CategoriesItem/Cat4.png", catName: "Red Apple", quantity: 68, cardColor: "#FEEFEA" },
    { imgScr: "/CategoriesItem/Cat5.png", catName: "Snack", quantity: 34, cardColor: "#FFF3EB" },
    { imgScr: "/CategoriesItem/Cat6.png", catName: "Black plum", quantity: 25, cardColor: "#FFF3FF" },
    { imgScr: "/CategoriesItem/Cat7.png", catName: "Vegetables", quantity: 65, cardColor: "#F2FCE4" },
    { imgScr: "/CategoriesItem/Cat8.png", catName: "Headphone", quantity: 33, cardColor: "#FFFCEB" },
    { imgScr: "/CategoriesItem/Cat9.png", catName: "Cake & Milk", quantity: 54, cardColor: "#F2FCE4" },
    { imgScr: "/CategoriesItem/Cat10.png", catName: "Orange", quantity: 63, cardColor: "#FFF3FF" }
  ])

  const promoDatas = ref([
    { promoText: "Everyday Fresh & Clean with Our Products", promoImg: "/Promotion/Pro1.jpg", promoColor: "#F0E8D5", btnColor: "#3BB77E" },
    { promoText: "Make your Breakfast Healthy and Easy", promoImg: "/Promotion/Pro2.png", promoColor: "#F3E8E8", btnColor: "#3BB77E" },
    { promoText: "The best Organic Products Online", promoImg: "/Promotion/Pro3.jpg", promoColor: "#E7EAF3", btnColor: "#FDC040" }
  ])
</script>

<template>
  <div class="category">
    <category
      v-for="(cat, index) in catDatas"
      :key="index"
      class="box"
      :imgScr="cat.imgScr"
      :catName="cat.catName"
      :quantity="cat.quantity"
      :cardColor="cat.cardColor"
    />
  </div>

  <div class="promotion">
    <promotion
      v-for="(promo, index) in promoDatas"
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
  .category, .promotion { 
    display: flex; 
    flex-wrap: wrap; 
    justify-content: center; 
    gap: 10px; padding: 10px; 
    } 
</style>
