
<template>
  <div class="card product-card h-100">
    <img :src="product.imagen" class="card-img-top" :alt="product.nombre" style="height: 200px; object-fit: cover;">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title text-purple">{{ product.nombre }}</h5>
      <p class="card-text flex-grow-1">{{ product.descripcion }}</p>
      <div class="mt-auto">
        <p class="card-text">
          <strong class="h4 text-dark">${{ product.precio.toLocaleString() }}</strong>
        </p>
        <button class="btn btn-purple btn-sm w-100" @click="viewDetails">
          Ver Detalles
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCardComponent',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewDetails() {
      this.$emit('view-details', this.product);
    }
  }
}
</script>

<style scoped>
.product-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border: 2px solid #fce4ec;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(104, 10, 71, 0.2);
}

.btn-purple {
  background-color: #680a47;
  border-color: #680a47;
  color: white;
}

.btn-purple:hover {
  background-color: #55093a;
  border-color: #55093a;
}

.text-purple {
  color: #680a47;
}
</style>