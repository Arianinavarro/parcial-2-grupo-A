<!-- Vista de Gestión de Productos - Implementa estados de carga y validación -->
<template>
  <div>
    <h2 class="text-purple mb-4">Nuestros Pasteles</h2>
    
    <!-- Botón para agregar producto -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h4 class="mb-0">Gestión de Pasteles</h4>
      <button class="btn btn-purple" @click="addProduct">
        + Agregar Pastel
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-purple" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-2">Conectando con API...</p>
    </div>

    <!-- Modal para agregar/editar producto -->
    <div class="modal fade show" :class="{ 'd-block': showAddForm || editingProduct }" v-if="showAddForm || editingProduct">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingProduct ? 'Editar Pastel' : 'Agregar Nuevo Pastel' }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveProduct">
              <div class="mb-3">
                <label class="form-label">Nombre del Pastel</label>
                <input type="text" class="form-control" v-model="currentProduct.nombre" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Precio</label>
                <input type="number" class="form-control" v-model="currentProduct.precio" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea class="form-control" v-model="currentProduct.descripcion" required></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label">URL de la Imagen</label>
                <input type="url" class="form-control" v-model="currentProduct.imagen" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
            <button type="button" class="btn btn-purple" @click="saveProduct">
              {{ editingProduct ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de productos -->
    <div class="table-responsive" v-if="!loading">
      <table class="table table-striped table-hover">
        <thead class="table-purple">
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
              <img :src="product.imagen" :alt="product.nombre" 
                   style="width: 50px; height: 50px; object-fit: cover;" class="rounded">
            </td>
            <td>{{ product.nombre }}</td>
            <td>${{ product.precio.toLocaleString() }}</td>
            <td>{{ product.descripcion }}</td>
            <td>
              <button class="btn btn-sm btn-outline-primary me-1" @click="editProduct(product)">
                Editar
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteProduct(product.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mensaje si no hay productos -->
    <div v-if="products.length === 0 && !loading" class="alert alert-info text-center">
      No hay productos disponibles.
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductView',
  data() {
    return {
      products: [],
      loading: false,
      showAddForm: false,
      editingProduct: null,
      currentProduct: {
        nombre: '',
        precio: 0,
        descripcion: '',
        imagen: ''
      }
    }
  },
  async mounted() {
    await this.loadProducts();
  },
  methods: {
    // GET - Listar productos desde API externa (JSON Server)
    async loadProducts() {
      this.loading = true;
      try {
        console.log('🔗 Conectando con API externa...');
        const response = await fetch('http://localhost:3001/productos');
        
        if (!response.ok) {
          throw new Error('Error en la API');
        }
        
        this.products = await response.json();
        console.log('✅ Productos cargados desde API:', this.products.length);
      } catch (error) {
        console.error('❌ Error cargando productos desde API:', error);
        
        // Fallback a datos locales si la API no está disponible
        try {
          console.log('🔄 Usando fallback local...');
          const localResponse = await fetch('/data/productos.json');
          this.products = await localResponse.json();
        } catch (localError) {
          console.error('Error cargando productos locales:', localError);
        }
      } finally {
        this.loading = false;
      }
    },
    
    // AGREGAR PRODUCTO
    addProduct() {
      this.editingProduct = null;
      this.currentProduct = {
        nombre: '',
        precio: 0,
        descripcion: '',
        imagen: ''
      };
      this.showAddForm = true;
    },
    
    // EDITAR PRODUCTO
    editProduct(product) {
      this.editingProduct = product;
      this.currentProduct = { ...product };
      this.showAddForm = true;
    },
    
    // GUARDAR PRODUCTO (CREATE o UPDATE) con API
    async saveProduct() {
      try {
        if (this.editingProduct) {
          // PUT - Actualizar en API externa
          console.log('🔄 Actualizando producto en API...');
          const response = await fetch(`http://localhost:3001/productos/${this.editingProduct.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.currentProduct)
          });
          
          if (response.ok) {
            const updatedProduct = await response.json();
            // Actualizar localmente
            const index = this.products.findIndex(p => p.id === this.editingProduct.id);
            if (index !== -1) {
              this.products[index] = updatedProduct;
            }
            console.log('✅ Producto actualizado en API');
          }
        } else {
          // POST - Crear en API externa
          console.log('🆕 Creando producto en API...');
          const response = await fetch('http://localhost:3001/productos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.currentProduct)
          });
          
          if (response.ok) {
            const newProduct = await response.json();
            this.products.unshift(newProduct);
            console.log('✅ Producto creado en API');
          }
        }
        this.closeModal();
      } catch (error) {
        console.error('❌ Error guardando producto en API:', error);
        // Fallback: guardar localmente
        this.saveProductLocally();
      }
    },

    // ELIMINAR PRODUCTO con API
    async deleteProduct(productId) {
      if (confirm('¿Estás seguro de eliminar este pastel?')) {
        try {
          // DELETE en API externa
          console.log('🗑️ Eliminando producto de API...');
          const response = await fetch(`http://localhost:3001/productos/${productId}`, {
            method: 'DELETE'
          });
          
          if (response.ok) {
            // Eliminar localmente
            this.products = this.products.filter(p => p.id !== productId);
            console.log('✅ Producto eliminado de API');
          }
        } catch (error) {
          console.error('❌ Error eliminando producto de API:', error);
          // Fallback: eliminar localmente
          this.products = this.products.filter(p => p.id !== productId);
        }
      }
    },
    
    // Fallback para guardar localmente
    saveProductLocally() {
      if (this.editingProduct) {
        const index = this.products.findIndex(p => p.id === this.editingProduct.id);
        if (index !== -1) {
          this.products[index] = { ...this.currentProduct };
        }
      } else {
        const newProduct = {
          ...this.currentProduct,
          id: Math.max(...this.products.map(p => p.id), 0) + 1
        };
        this.products.unshift(newProduct);
      }
      this.closeModal();
    },
    
    // CERRAR MODAL
    closeModal() {
      this.showAddForm = false;
      this.editingProduct = null;
      this.currentProduct = {
        nombre: '',
        precio: 0,
        descripcion: '',
        imagen: ''
      };
    }
  }
}
</script>

<style scoped>
.table-purple {
  background-color: #680a47;
  color: white;
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

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.spinner-border.text-purple {
  color: #680a47 !important;
}
</style>