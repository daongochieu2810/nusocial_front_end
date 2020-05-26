<template>
  <div class="drawer">
    <b-button v-b-toggle.sidebar-1 style="background-color: white;border:0">
      <img src="../assets/chevron_right.png" alt="open_drawer" style=";width: 20px;height: 20px" />
    </b-button>
    <b-sidebar id="sidebar-1" title="Friends" shadow>
      <div class="px-3 py-2">
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
          in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
        </p>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.drawer {
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 4; /* Stay on top */
  top: 50vh; /* Stay at the top */
  left: 0;
  overflow-x: hidden; /* Disable horizontal scroll */
}
</style>