<template>
  <div class="home-container">
    <!-- Imagen centrada -->
    <div class="text-center mb-4">
      <img 
        :src="pasteleriaImage" 
        alt="Repostería ARI-ANA" 
        class="home-image rounded shadow"
      >
    </div>

    <!-- Descripción de la repostería -->
    <div class="description-container">
      <h2 class="text-purple text-center mb-3">Bienvenidos a Repostería ARI-ANA</h2>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card border-purple">
            <div class="card-body">
              <p class="card-text text-center lead">
                En <strong>Repostería ARI-ANA</strong> endulzamos tus momentos especiales con 
                los pasteles más deliciosos y creativos. Cada uno de nuestros productos 
                está elaborado con ingredientes de la más alta calidad y mucho amor, 
                garantizando un sabor inolvidable que hará de tu celebración algo único.
              </p>
              <p class="card-text text-center">
                Desde clásicos pasteles de chocolate hasta creaciones innovadoras, 
                tenemos el postre perfecto para cada ocasión. ¡Déjanos ser parte de 
                tus dulces recuerdos!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Acciones rápidas -->
    <div class="quick-actions mt-5">
      <h4 class="text-purple text-center mb-4">Explora Nuestra Repostería</h4>
      <div class="row justify-content-center">
        <div class="col-md-3 mb-3">
          <router-link to="/dashboard/productos" class="btn btn-purple btn-lg w-100">
            🎂 Ver Productos
          </router-link>
        </div>
        <div class="col-md-3 mb-3">
          <router-link to="/dashboard/catalogo" class="btn btn-outline-purple btn-lg w-100">
            📋 Ver Catálogo
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardHome',
  data() {
    return {
      pasteleriaImage: 'https://proingra.com/wp-content/uploads/2023/10/sabor-dulzura-pasteleria-pop-mart-blindbox-fondo-limpio-ia-generativa-scaled.jpg'
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 20px 0;
}

.home-image {
  max-width: 600px;
  width: 100%;
  height: auto;
  border: 5px solid #fce4ec;
}

.description-container {
  margin: 40px 0;
}

.border-purple {
  border-color: #680a47 !important;
}

.btn-purple {
  background-color: #680a47;
  border-color: #680a47;
  color: white;
  padding: 12px 20px;
  font-size: 16px;
}

.btn-purple:hover {
  background-color: #55093a;
  border-color: #55093a;
}

.btn-outline-purple {
  border-color: #680a47;
  color: #680a47;
  padding: 12px 20px;
  font-size: 16px;
}

.btn-outline-purple:hover {
  background-color: #680a47;
  color: white;
}

.text-purple {
  color: #680a47;
}

.card {
  box-shadow: 0 4px 15px rgba(104, 10, 71, 0.1);
}

.lead {
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>