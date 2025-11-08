# 🎂 Repostería ARI-ANA - Aplicación Web Modularizada

## 📋 Descripción General del Negocio y Objetivo de la Aplicación

**Repostería ARI-ANA** es una empresa especializada en la creación de pasteles artesanales y postres gourmet. Nos dedicamos a endulzar los momentos especiales de nuestros clientes con productos elaborados con ingredientes de primera calidad, técnicas tradicionales y un toque de creatividad moderna.

**Objetivo de la Aplicación:** Desarrollar una plataforma web modular para la gestión interna de la repostería que permita administrar el inventario de productos, visualizar el catálogo y gestionar la información de la empresa, implementando las mejores prácticas de desarrollo con Vue.js 3, Bootstrap 5.3 y consumo de APIs externas.

**⚠️ NOTA IMPORTANTE:** El sistema de login implementado es únicamente con fines educativos y NO representa un sistema de autenticación seguro para entornos productivos.

## 🏗️ Explicación de cómo se implementó la Modularización

### **Arquitectura Modular del Proyecto**

```
reposteria_ari-ana/
├── db.json                          # Base de datos para API JSON Server
├── public/
│   ├── data/
│   │   ├── usuarios.json           # Datos de autenticación local
│   │   └── productos.json          # Datos de fallback
│   └── index.html
├── src/
│   ├── components/                 # Componentes reutilizables
│   │   ├── NavbarComponent.vue     # Encabezado de la aplicación
│   │   ├── SidebarComponent.vue    # Navegación lateral persistente
│   │   ├── FooterComponent.vue     # Pie de página
│   │   └── ProductCardComponent.vue # Tarjetas individuales de productos
│   ├── views/                      # Vistas principales
│   │   ├── LoginView.vue           # Sistema de autenticación
│   │   ├── DashboardView.vue       # Layout principal del dashboard
│   │   ├── DashboardHome.vue       # Página de inicio con imagen corporativa
│   │   ├── ProductView.vue         # Gestión CRUD de productos
│   │   └── ProductsGridView.vue    # Catálogo visual de productos
│   ├── router/
│   │   └── index.js                # Configuración de rutas con vue-router
│   ├── App.vue                     # Componente raíz de la aplicación
│   └── main.js                     # Punto de entrada con configuración Bootstrap
└── README.md
```

### **Sistema de Rutas con Vue Router**

```javascript
// Configuración de rutas principales con rutas hijas
const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: DashboardHome
      },
      {
        path: 'productos',
        name: 'productos', 
        component: ProductView
      },
      {
        path: 'catalogo',
        name: 'catalogo',
        component: ProductsGridView
      }
    ]
  }
]
```

**Características de la modularización:**
- ✅ **Separación clara de responsabilidades** entre componentes, vistas y servicios
- ✅ **Componentes reutilizables** con funcionalidades específicas
- ✅ **Sistema de rutas hijas** para mantener el layout del dashboard
- ✅ **Arquitectura escalable** que facilita el mantenimiento

## 🔌 Ejemplo de Consumo de la API Externa para Gestionar los Productos

### **Implementación de JSON Server como API Externa**

Hemos implementado **JSON Server** como API REST simulada que proporciona endpoints completos para operaciones CRUD:

**URL de la API:** `http://localhost:3001/productos`

### **Operaciones HTTP Implementadas**

#### **GET - Obtener todos los productos**
```javascript
async loadProducts() {
  this.loading = true;
  try {
    const response = await fetch('http://localhost:3001/productos');
    if (!response.ok) throw new Error('Error en la API');
    this.products = await response.json();
  } catch (error) {
    console.error('Error cargando productos desde API:', error);
    // Fallback a datos locales
    await this.loadLocalProducts();
  } finally {
    this.loading = false;
  }
}
```

#### **POST - Crear nuevo producto**
```javascript
async saveProduct() {
  try {
    const response = await fetch('http://localhost:3001/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.currentProduct)
    });
    
    if (response.ok) {
      const newProduct = await response.json();
      this.products.unshift(newProduct);
    }
  } catch (error) {
    console.error('Error guardando producto en API:', error);
    this.saveProductLocally(); // Fallback local
  }
}
```

#### **PUT - Actualizar producto existente**
```javascript
const response = await fetch(`http://localhost:3001/productos/${this.editingProduct.id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(this.currentProduct)
});
```

#### **DELETE - Eliminar producto**
```javascript
const response = await fetch(`http://localhost:3001/productos/${productId}`, {
  method: 'DELETE'
});
```

### **Estructura de la API JSON Server**

**Archivo db.json:**
```json
{
  "productos": [
    {
      "id": 1,
      "nombre": "Pastel de Chocolate",
      "precio": 25000,
      "descripcion": "Intenso y cremoso pastel de chocolate con cobertura de ganache.",
      "imagen": "https://ejemplo.com/pastel-chocolate.jpg",
      "categoria": "pasteles"
    }
  ]
}
```

### **Características del Consumo de API**
- ✅ **API Externa Real** - JSON Server en puerto 3001
- ✅ **Operaciones CRUD Completas** - GET, POST, PUT, DELETE
- ✅ **Manejo de Estados** - Loading, error, success
- ✅ **Sistema de Fallback** - Datos locales si la API falla
- ✅ **Transformación de Datos** - Adaptación al contexto de negocio

## 🔄 Ejemplo de Comunicación entre Componentes (Props y Eventos)

### **Comunicación mediante Props**

**ProductCardComponent.vue - Componente que recibe datos:**
```vue
<template>
  <div class="card product-card h-100">
    <img :src="product.imagen" :alt="product.nombre" class="card-img-top">
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
```

**ProductsGridView.vue - Uso del componente con props:**
```vue
<template>
  <div class="row">
    <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-lg-4 mb-4">
      <ProductCardComponent 
        :product="product" 
        @view-details="handleViewDetails"
      />
    </div>
  </div>
</template>

<script>
import ProductCardComponent from '@/components/ProductCardComponent.vue'

export default {
  components: {
    ProductCardComponent
  },
  methods: {
    handleViewDetails(product) {
      alert(`Detalles de: ${product.nombre}\nPrecio: $${product.precio.toLocaleString()}`);
    }
  }
}
</script>
```

### **Comunicación mediante Eventos**

**SidebarComponent.vue - Emisión de eventos:**
```vue
<script>
export default {
  methods: {
    logout() {
      // Emitir acción de logout
      localStorage.removeItem('isAuthenticated');
      // Navegación programática mediante router
      this.$router.push('/login');
    }
  }
}
</script>
```

### **Comunicación mediante Rutas Hijas**

**DashboardView.vue - Layout persistente:**
```vue
<template>
  <div class="dashboard">
    <div class="container-fluid">
      <div class="row">
        <SidebarComponent />    <!-- Componente siempre visible -->
        <div class="col-md-9 col-lg-10">
          <NavbarComponent />   <!-- Componente siempre visible -->
          <main class="p-4">
            <router-view></router-view>  <!-- Contenido dinámico según ruta -->
          </main>
          <FooterComponent />   <!-- Componente siempre visible -->
        </div>
      </div>
    </div>
  </div>
</template>
```

## 👥 Evidencia del Trabajo Colaborativo

### **Estrategia de Desarrollo con Git**

**Flujo de trabajo colaborativo implementado:**

```
main (rama principal estable)
├── feature/authentication (sistema de login)
├── feature/api-integration (consumo de JSON Server)
├── feature/modular-components (componentes reutilizables)
├── feature/routing-system (sistema de rutas hijas)
└── feature/styling-ux (diseño Bootstrap + personalización)
```

### **Ejemplo de Commits Semánticos**

```bash
feat: implementa consumo de API JSON Server para operaciones CRUD
feat: añade componentes modulares Navbar, Sidebar, Footer
feat: crea sistema de rutas hijas para layout persistente
feat: implementa comunicación entre componentes via props y eventos
fix: corrige navegación y estados activos en sidebar
style: aplica paleta de colores #680a47 para identidad de marca
docs: actualiza README con documentación técnica completa
refactor: mejora estructura modular del proyecto
```

### **Ejemplo de Pull Requests**

- **PR #1:** feat: estructura inicial Vue.js 3 con Bootstrap 5.3
- **PR #2:** feat: integra JSON Server como API REST externa
- **PR #3:** feat: implementa componentes reutilizables modulares
- **PR #4:** feat: añade sistema de autenticación y protección de rutas
- **PR #5:** feat: implementa CRUD completo con consumo de API
- **PR #6:** feat: desarrolla vistas de catálogo y gestión de productos

### **Metodología de Trabajo en Equipo**

- **Revisión de Código:** Todos los PRs requieren aprobación de al menos un miembro
- **Integración Continua:** Fusión frecuente a la rama principal
- **Responsabilidades Distribuidas:**
  - **Miembro 1:** Arquitectura Vue.js, sistema de rutas y estado
  - **Miembro 2:** Integración con APIs, lógica de negocio y CRUD
  - **Miembro 3:** Componentes UI/UX, diseño responsivo y experiencia de usuario
- **Control de Calidad:** Testing manual de todas las funcionalidades entre miembros

### **Evidencias de Colaboración**

- **Commits frecuentes y descriptivos** con convenciones semánticas
- **Pull Requests documentados** con descripciones detalladas de los cambios
- **Code reviews colaborativas** entre miembros del equipo
- **Resolución de conflictos** de merge de forma coordinada
- **Seguimiento de issues** y milestones para gestión del progreso
- **Documentación técnica** actualizada colaborativamente

## 🚀 Instalación y Ejecución

### **Prerrequisitos**
- Node.js 18+ 
- npm 8+
- Vue CLI

### **Configuración del Proyecto**

```bash
# Instalar Vue CLI globalmente
npm install -g @vue/cli

# Instalar JSON Server globalmente
npm install -g json-server

# Instalar dependencias del proyecto
npm install

# Instalar Bootstrap
npm install bootstrap@5.3.0
```

### **Ejecución en Desarrollo**

**Terminal 1 - API JSON Server:**
```bash
json-server --watch db.json --port 3001
```

**Terminal 2 - Aplicación Vue:**
```bash
npm run serve
```

### **URLs de Acceso**

- **Aplicación Vue:** http://localhost:8081
- **API JSON Server:** http://localhost:3001/productos
- **Credenciales Login:** usuario: `ana`, contraseña: `123`

## 🛠 Tecnologías Utilizadas

- **Vue.js 3** - Framework principal con Options API
- **Bootstrap 5.3** - Framework CSS para diseño responsivo
- **Vue Router** - Navegación SPA con rutas hijas
- **JSON Server** - API REST simulada para desarrollo
- **JavaScript ES6** - Lógica de aplicación moderna
- **Fetch API** - Consumo de servicios HTTP

## 🎯 Funcionalidades Implementadas

### **Autenticación y Seguridad**
- ✅ Sistema de login con validación desde JSON local
- ✅ Protección de rutas con navigation guards
- ✅ Manejo de sesión con localStorage

### **Gestión de Productos**
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- ✅ Consumo de API externa JSON Server
- ✅ Dos vistas: tabla administrativa y catálogo visual
- ✅ Diseño responsivo con Bootstrap

### **Arquitectura y Experiencia de Usuario**
- ✅ Componentes modulares y reutilizables
- ✅ Navegación con sidebar persistente
- ✅ Diseño coherente con identidad de marca
- ✅ Interfaz intuitiva y profesional

---

**Repostería ARI-ANA - ¡Endulzando momentos especiales con cada creación!** 🎂

*Desarrollado para el Segundo Parcial de Desarrollo de Aplicaciones Web - Implementando modularización, componentización y consumo de APIs externas con Vue.js 3 y Bootstrap 5.3*