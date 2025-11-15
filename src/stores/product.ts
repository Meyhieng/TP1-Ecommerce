import { defineStore } from "pinia";

export interface Group {
  id: number;
  groupName: string;
}

export interface Category {
  id: number;
  catName: string;
  imgScr: string;
  quantity: number;
  cardColor: string;
  group: string;
}

export interface Promotion {
  id: number;
  promoText: string;
  promoImg: string;
  promoColor: string;
  btnColor: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  imgScr: string;
  categoryId: number;
  countSold: number;
}

export const useProductStore = defineStore("product", {
  state: () => ({
    groups: [] as Group[],
    promotions: [] as Promotion[],
    categories: [] as Category[],
    products: [] as Product[],
  }),

  getters: {
    getCategoriesByGroup: (state) => {
      return (groupName: string) =>
        state.categories.filter((c) => c.group === groupName);
    },

    getProductsByGroup: (state) => {
      return (groupName: string) =>
        state.products.filter(
          (p) =>
            state.categories.find((c) => c.id === p.categoryId)?.group ===
            groupName
        );
    },

    getProductsByCategory: (state) => {
      return (categoryId: number) =>
        state.products.filter((p) => p.categoryId === categoryId);
    },

    getPopularProducts: (state) => {
      return state.products.filter((p) => p.countSold > 10);
    },
  },

  actions: {
    setGroups(data: Group[]) {
      this.groups = data;
    },
    setPromotions(data: Promotion[]) {
      this.promotions = data;
    },
    setCategories(data: Category[]) {
      this.categories = data;
    },
    setProducts(data: Product[]) {
      this.products = data;
    },
  },
});
