<template>
  <div class="login-container">
    <div class="card shadow" style="width: 400px;">
      <div class="card-body p-4">
        <h2 class="card-title text-center mb-4 text-purple">Repostería ARI-ANA</h2>
        <h5 class="text-center mb-4">Iniciar Sesión</h5>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Usuario</label>
            <input 
              type="text" 
              class="form-control" 
              id="username"
              v-model="username"
              required
            >
          </div>
          
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input 
              type="password" 
              class="form-control" 
              id="password"
              v-model="password"
              required
            >
          </div>
          
          <button type="submit" class="btn btn-purple w-100">Ingresar</button>
        </form>

        <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
          {{ errorMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        // Cargar usuarios desde el JSON local
        const response = await fetch('/data/usuarios.json');
        const users = await response.json();
        
        // Validar credenciales
        const user = users.find(u => 
          u.username === this.username && u.password === this.password
        );
        
        if (user) {
          // Login exitoso - redirigir al dashboard
          localStorage.setItem('isAuthenticated', 'true');
          this.$router.push('/dashboard');
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos';
        }
      } catch (error) {
        this.errorMessage = 'Error al cargar los usuarios';
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color, #f8f9fa);
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