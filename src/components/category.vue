<script setup lang="ts">
    const props = defineProps({
        imgScr:{
            type: String,
            required: true
        }, 
        catName:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        cardColor:{
            type:String,
            default: 'gray'
        }
    }) 

</script>

<template>
  <div class="catCard" :style="{backgroundColor: cardColor}">
        <img class="catImg" :src="imgScr" :alt="catName">
        <h3 class="catName">{{catName}}</h3>
        <p class="catQuant">{{ quantity }}items</p>
  </div>
</template>

<style scoped>
    .catCard{
        width: 136px;
        height: 167px;
        border-radius: 10px;
        display: flex;              
        flex-direction: column;     
        justify-content: center;
        align-items: center;        
        text-align: center;         
    }
    .catImg{
        width: 50%;
        height: 50%;
    }
    .catName{
        font-size: 14px;
        font-weight: 600;
    }
    .catQuant{
        font-size: 12px;
        color: #777;
    }
</style>