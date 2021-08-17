<template>
  <div>
    <Nav class="sticky top-0" />
    <div class="w-4/5 sm:w-1/2 mx-auto">
      <h1 class="m-5 font-bold text-lg">Your Cart</h1>
    </div>
    <div
      v-for="item in getCart"
      :key="item.id"
      class="w-4/5 sm:w-1/2 flex items-center space-x-3 mx-auto shadow-lg m-5 p-3"
    >
      <div>
        <img class="h-24" :src="`${item.url}`" alt="" />
      </div>
      <div>
        <p>
          {{ item.name }}
        </p>
        <p>
          {{ item.quantity | formatQuantity }}
        </p>
        <button class="button--delete" @click="deleteCartItem(item.id)">
          Delete
        </button>
      </div>
    </div>
    <div class="w-4/5 sm:w-1/2 mb-2 mx-auto">
      <p>
        <span>Total: </span> {{ formatCartTotal(getCartTotal) | formatPrice }}
      </p>
      <button
        v-show="getCartTotal > 0"
        class="button--green mx-auto"
        @click="handleSubmit"
      >
        checkout
      </button>
    </div>
    <Ads class="mx-auto sm:m-10" />
    <Footer />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['getCart', 'getCartTotal']),
  },
  mounted() {
    this.displayMessage()
  },
  filters: {
    formatPrice(price) {
      return `$${price}`
    },
    formatQuantity(num) {
      const qtyNum = num === 1 ? `${num} unit` : `${num} units`
      return qtyNum
    },
  },
}
</script>
<style scoped></style>