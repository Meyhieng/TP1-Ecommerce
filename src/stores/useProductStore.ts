import { defineStore } from 'pinia'
import axios from 'axios'

interface Group {
  id: number
  name: string
}

interface Promotion {
  id: number
  title: string
  color?: string
  buttonColor?: string
  image?: string
}

interface Category {
  id: number
  name: string
  image?: string
  color?: string
  productCount: number
}

interface Product {
  id: number
  productId?: string | number
  name: string
  group: string
  categoryId: number
  price: number
  rating: number
  size: string
  image?: string | File
  promotionAsPercentage?: number
  instock: number
  countSold: number
  isHot?: boolean
  isNew?: boolean
}

interface ProductState {
  groups: Group[]
  promotions: Promotion[]
  categories: Category[]
  products: Product[]
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    groups: [],
    promotions: [],
    categories: [],
    products: []
  }),

  getters: {
    getCategoriesByGroup: (state) => {
      return (groupName: string): Category[] => 
        state.categories.filter(c => c.name === groupName)
    },
    getCategories: (state): Category[] => {
      return state.categories
    },
    getPromotions: (state): Promotion[] => {
      return state.promotions
    },
    getProductsByGroup: (state) => {
      return (groupName: string): Product[] => 
        state.products.filter(p => p.group === groupName)
    },
    getProductsByCategory: (state) => {
      return (categoryId: number): Product[] => 
        state.products.filter(p => p.categoryId === categoryId)
    },
    getPopularProducts: (state): Product[] => {
      return state.products.filter(p => p.countSold > 10)
    }
  },

  actions: {
    async fetchCategories() {
      try {
        const res = await axios.get<Category[]>('http://localhost:3000/api/categories')
        this.categories = res.data
      } catch (err) {
        console.log('Error loading categories:', err)
      }
    },

    async fetchPromotions() {
      try {
        const res = await axios.get<Promotion[]>('http://localhost:3000/api/promotions')
        this.promotions = res.data
      } catch (err) {
        console.log('Error loading promotions:', err)
      }
    },

    async fetchGroups() {
      try {
        const res = await axios.get<Group[]>('http://localhost:3000/api/groups')
        this.groups = res.data
      } catch (err) {
        console.log('Error loading groups:', err)
      }
    },

    async fetchProducts() {
      try {
        const res = await axios.get<Product[]>('http://localhost:3000/api/products')
        this.products = res.data
      } catch (err) {
        console.log('Error loading products:', err)
      }
    },

    async loadAll() {
      await Promise.all([
        this.fetchCategories(),
        this.fetchPromotions(),
        this.fetchGroups(),
        this.fetchProducts()
      ])
    }
  }
})