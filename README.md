# Repostería ARI-ANA - Aplicación Web Modularizada

## Descripción General del Negocio y Objetivo de la Aplicación

Repostería ARI-ANA es una empresa dedicada a la creación de pasteles artesanales y postres de alta calidad.

El objetivo de esta aplicación es desarrollar una plataforma web modular para la gestión interna de la repostería, permitiendo el control de inventario, visualización de productos y administración del catálogo. Esta aplicación implementa las mejores prácticas de desarrollo con Vue.js 3, Bootstrap 5.3 y consumo de APIs externas.

Nota importante: El sistema de login implementado es únicamente con fines educativos y no representa un sistema de autenticación seguro para entornos productivos.

## Explicación de cómo se implementó la Modularización

### Estructura Modular del Proyecto

El proyecto sigue una arquitectura modular bien definida con separación clara de responsabilidades:


reposteria_ari-ana/
├── db.json
├── public/
│   ├── data/
│   │   ├── usuarios.json
│   │   └── productos.json
│   └── index.html
├── src/
│   ├── components/
│   │   ├── NavbarComponent.vue
│   │   ├── SidebarComponent.vue
│   │   ├── FooterComponent.vue
│   │   └── ProductCardComponent.vue
│   ├── views/
│   │   ├── LoginView.vue
│   │   ├── DashboardView.vue
│   │   ├── DashboardHome.vue
│   │   ├── ProductView.vue
│   │   └── ProductsGridView.vue
│   ├── router/
│   │   └── index.js
│   ├── App.vue
│   └── main.js
└── README.md


### Arquitectura de Componentes

Se implementaron cuatro componentes reutilizables:

- NavbarComponent: Encabezado superior con el nombre del negocio
- SidebarComponent: Menú lateral con las rutas disponibles
- FooterComponent: Pie de página con los derechos reservados
- ProductCardComponent: Tarjeta individual para mostrar productos

### Sistema de Rutas

Se configuró Vue Router con un sistema de rutas hijas para mantener el layout del dashboard persistente:

  javascript
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


## Ejemplo de Consumo de la API Externa para Gestionar los Productos

### Implementación de JSON Server como API Externa

Se implementó JSON Server como API REST simulada que proporciona endpoints completos para operaciones CRUD en la URL: http://localhost:3001/productos

### Operaciones HTTP Implementadas

#### GET - Obtener todos los productos

  javascript
async loadProducts() {
  try {
    const response = await fetch('http://localhost:3001/productos');
    if (!response.ok) throw new Error('Error en la API');
    this.products = await response.json();
  } catch (error) {
    console.error('Error cargando productos desde API:', error);
    const localResponse = await fetch('/data/productos.json');
    this.products = await localResponse.json();
  }
}


#### POST - Crear nuevo producto

javascript
const response = await fetch('http://localhost:3001/productos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(this.currentProduct)
});


#### PUT - Actualizar producto existente

javascript
const response = await fetch(`http://localhost:3001/productos/${this.editingProduct.id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(this.currentProduct)
});


#### DELETE - Eliminar producto

javascript
const response = await fetch(`http://localhost:3001/productos/${productId}`, {
  method: 'DELETE'
});


### Estructura de la API

El archivo db.json contiene la estructura de datos para los productos de la repostería:

json
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


## Ejemplo de Comunicación entre Componentes (Props y Eventos)

### Comunicación mediante Props

ProductCardComponent.vue - Componente que recibe datos mediante props:

vue
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


ProductsGridView.vue - Uso del componente con paso de props:

 vue
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


### Comunicación mediante Eventos

SidebarComponent.vue - Emisión de eventos para logout:

vue
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
    }
  }
}
</script>


## Evidencia del Trabajo Colaborativo

### Estrategia de Desarrollo con Control de Versiones

Se implementó un flujo de trabajo colaborativo utilizando Git y GitHub con las siguientes características:

- Rama principal: main (versión estable)
- Ramas de características para cada funcionalidad
- Pull requests para revisión de código
- Commits semánticos y descriptivos

### Ejemplos de Commits Realizados

-  implementa consumo de API JSON Server para operaciones CRUD
-  añade componentes modulares Navbar, Sidebar, Footer
-  crea sistema de rutas hijas para layout persistente
-  implementa comunicación entre componentes via props y eventos
-  corrige navegación y estados activos en sidebar
-  aplica paleta de colores personalizada para identidad de marca
-  actualiza README con documentación técnica completa

### Metodología de Trabajo en Equipo

El desarrollo se realizó de manera colaborativa con las siguientes prácticas:

- Revisión de código mediante pull requests
- Integración continua a la rama principal
- Distribución de responsabilidades entre los miembros
- Resolución colaborativa de conflictos

### Evidencias de Colaboración en GitHub

- Múltiples commits de diferentes autores
- Ramas de características creadas y fusionadas
- Pull requests documentados con descripciones detalladas
- Revisiones de código entre miembros del equipo


## Instalación y Ejecución

### Prerrequisitos

- Node.js 18+
- npm 8+
- Vue CLI

### Configuración del Proyecto

bash
npm install -g @vue/cli
npm install -g json-server
npm install
npm install bootstrap@5.3.0


### Ejecución en Desarrollo

Terminal 1 - API JSON Server:
bash
json-server --watch db.json --port 3001


Terminal 2 - Aplicación Vue:
bash
npm run serve


### URLs de Acceso

- Aplicación Vue: http://localhost:8081
- API JSON Server: http://localhost:3001/productos
- Credenciales Login: usuario: ana, contraseña: 123

## Tecnologías Utilizadas

- Vue.js 3 - Framework principal con Options API
- Bootstrap 5.3 - Framework CSS para diseño responsivo
- Vue Router - Navegación SPA con rutas hijas
- JSON Server - API REST simulada para desarrollo
- JavaScript ES6 - Lógica de aplicación moderna
- Fetch API - Consumo de servicios HTTP

## Funcionalidades Implementadas

### Autenticación y Seguridad

- Sistema de login con validación desde JSON local
- Protección de rutas con navigation guards
- Manejo de sesión con localStorage

### Gestión de Productos

- CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Consumo de API externa JSON Server
- Dos vistas: tabla administrativa y catálogo visual
- Diseño responsivo con Bootstrap

### Arquitectura y Experiencia de Usuario

- Componentes modulares y reutilizables
- Navegación con sidebar persistente
- Diseño coherente con identidad de marca
- Interfaz intuitiva y profesional



Desarrollado para el Segundo Parcial de Desarrollo de Aplicaciones Web - Implementando modularización, componentización y consumo de APIs externas con Vue.js 3 y Bootstrap 5.3

Proyecto desarrollado colaborativamente por Ariani Navarro y Ana Jaime.