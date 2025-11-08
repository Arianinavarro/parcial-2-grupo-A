<template>
  <div>
    <h2 class="text-purple mb-4">Nuestros Pasteles</h2>
    
    <div class="row">
      <div class="col-12 col-sm-6 col-lg-4 mb-4" v-for="product in products" :key="product.id">
        <ProductCardComponent 
          :product="product" 
          @view-details="handleViewDetails"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCardComponent from '@/components/ProductCardComponent.vue'

export default {
  name: 'ProductsGridView',
  components: {
    ProductCardComponent
  },
  data() {
    return {
      products: []
    }
  },
  async mounted() {
    await this.loadProducts();
  },
  methods: {
    async loadProducts() {
      try {
        const response = await fetch('/data/productos.json');
        this.products = await response.json();
      } catch (error) {
        console.error('Error cargando productos:', error);
      }
    },
    handleViewDetails(product) {
      alert(`Detalles de: ${product.nombre}\nPrecio: $${product.precio.toLocaleString()}`);
    }
  }
}
</script>

<style scoped>
.text-purple {
  color: #680a47;
}
</style>