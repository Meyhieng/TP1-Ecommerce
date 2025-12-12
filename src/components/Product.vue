<template>
  <div class="product-card" :class="{ 'has-discount': promotionAsPercentage }">
    
    <!-- BADGES -->
    <div v-if="promotionAsPercentage" class="badge discount">
      -{{ promotionAsPercentage }}%
    </div>
    <div v-if="isHot" class="badge hot">Hot</div>
    <div v-if="isNew" class="badge new">New</div>

    <!-- PRODUCT IMAGE -->
    <div class="image-wrapper">
      <img :src="imageUrl" :alt="name" class="product-image" />
    </div>

    <!-- DETAILS -->
    <div class="product-details">
      <p class="brand">{{ group }}</p>
      <h3 class="name">{{ name }}</h3>

      <!-- STAR RATING -->
      <div class="rating">
        <span
          v-for="n in 5"
          :key="n"
          class="star"
          :class="{ filled: n <= fullStars || (n === fullStars + 1 && hasHalfStar) }"
        >
          ★
        </span>
        <span class="review-count">({{ rating }})</span>
      </div>

      <p class="weight">{{ size }}</p>

      <!-- PRICE + CART BUTTON -->
      <div class="price-row">
        <div class="price">
          <span class="current-price">${{ currentPrice }}</span>
          <span v-if="promotionAsPercentage" class="old-price">
            ${{ price.toFixed(2) }}
          </span>
        </div>

        <button class="add-to-cart" @click="emit('add-to-cart', productId)">
          <span>Add</span>
          <span class="plus-icon">+</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'

interface Props {
  id?: number
  productId?: string | number
  image?: string | File
  name?: string
  rating?: number
  size?: string
  price?: number
  promotionAsPercentage?: number
  categoryId?: number
  instock?: number
  countSold?: number
  group?: string
  isHot?: boolean
  isNew?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  productId: '',
  image: '',
  name: '',
  rating: 0,
  size: '',
  price: 0,
  promotionAsPercentage: 0,
  categoryId: 0,
  instock: 0,
  countSold: 0,
  group: '',
  isHot: false,
  isNew: false
})

const emit = defineEmits<{
  'add-to-cart': [productId: string | number | undefined]
}>()

function fixImagePath(raw?: string | File): string {
  if (!raw || typeof raw !== 'string') return ''

  try {
    const arr = JSON.parse(raw) as string[]
    let path = arr[0] || ''
    path = path.replace(/\\/g, '/')
    return path
  } catch (e) {
    return ''
  }
}

const fullStars = computed(() => {
  return Math.floor(props.rating)
})

const hasHalfStar = computed(() => {
  return props.rating % 1 >= 0.5
})

const currentPrice = computed(() => {
  if (props.promotionAsPercentage > 0) {
    const d = props.price - (props.price * props.promotionAsPercentage) / 100
    return d.toFixed(2)
  }
  return props.price.toFixed(2)
})

const imageUrl = computed(() => {
  if (props.image instanceof File) {
    return URL.createObjectURL(props.image)
  }
  const cleanPath = fixImagePath(props.image)
  return `http://localhost:3000/${cleanPath}`
})

onBeforeUnmount(() => {
  if (props.image instanceof File && imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value)
  }
})
</script>

<style scoped>
.product-card {
  width: 100%;
  max-width: 250px;
  background: white;
  border: 1px solid #ececec;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.product-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: #3BB77E;
}

.image-wrapper {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 1rem;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 16px;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  z-index: 10;
}

.discount { left: 16px; background: #3BB77E; }
.hot { right: 16px; background: #F74B81; }
.new { right: 16px; background: #FDC040; color: #253D4E; }

.product-details {
  padding: 1rem 1.25rem 1.25rem;
}

.brand { font-size: 0.8rem; color: #ADADAD; margin-bottom: 0.5rem; text-transform: capitalize; }
.name { font-size: 0.95rem; font-weight: 600; color: #253D4E; margin-bottom: 0.6rem; height: 2.8em; overflow: hidden; }

.rating { display: flex; align-items: center; gap: 2px; margin-bottom: 0.5rem; }
.star { color: #E0E0E0; font-size: 0.9rem; }
.star.filled { color: #FCC419; }
.review-count { color: #B6B6B6; font-size: 0.8rem; }

.weight { font-size: 0.85rem; color: #7E7E7E; margin-bottom: 0.8rem; }

.price-row { display: flex; justify-content: space-between; align-items: center; }
.current-price { font-size: 1.2rem; font-weight: 700; color: #3BB77E; }
.old-price { text-decoration: line-through; color: #ADADAD; }

.add-to-cart {
  padding: 0.5rem 1rem;
  background: #DEF9EC;
  color: #3BB77E;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
}
.add-to-cart:hover { background: #3BB77E; color: white; }
.plus-icon { font-size: 1rem; font-weight: 700; }
</style>