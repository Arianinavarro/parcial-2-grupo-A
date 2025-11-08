<template>
  <div class="dashboard">
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar Component -->
        <SidebarComponent />
        
        <!-- Main content -->
        <div class="col-md-9 col-lg-10 main-content">
          <!-- Navbar Component -->
          <NavbarComponent />
          
          <!-- Content -->
          <main class="p-4">
            <router-view></router-view>
          </main>
          
          <!-- Footer Component -->
          <FooterComponent />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import SidebarComponent from '@/components/SidebarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  name: 'DashboardView',
  components: {
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  }
}
</script>

<style scoped>
.main-content {
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
}
</style>