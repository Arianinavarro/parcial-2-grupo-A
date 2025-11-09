<!-- Componente Sidebar - Mejoras en navegación y experiencia de usuario -->
 <template>
  <div class="col-md-3 col-lg-2 bg-light sidebar">
    <div class="position-sticky pt-3">
      <h5 class="text-center text-purple mb-4">Repostería ARI-ANA</h5>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link 
            to="/dashboard" 
            class="nav-link" 
            :class="{ 'active': $route.path === '/dashboard' }"
          >
            🏠 Inicio
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
            to="/dashboard/productos" 
            class="nav-link" 
            :class="{ 'active': $route.path.includes('/productos') }"
          >
            🎂 Productos
          </router-link>
        </li>
        <li class="nav-item">
          <router-link 
            to="/dashboard/catalogo" 
            class="nav-link" 
            :class="{ 'active': $route.path.includes('/catalogo') }"
          >
            📋 Catálogo
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" @click="logout">
            🔒 Cerrar Sesión
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarComponent',
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.sidebar {
  min-height: 100vh;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.nav-link {
  color: #333;
  padding: 10px 15px;
  margin: 5px 0;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: #fce4ec;
  color: #680a47;
}

.nav-link.active {
  background-color: #680a47;
  color: white;
}

.text-purple {
  color: #680a47;
}
</style>