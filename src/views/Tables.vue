<script setup>
import AuthorsTable from "./components/AuthorsTable.vue";
import ProjectsTable from "./components/ProjectsTable.vue";
</script>
<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <authors-table />
      </div>
    </div>
    <div class="mt-4 row">
      <div class="col-12">
        <projects-table />
      </div>
    </div>
    <div style="display: flex;">
      <div class="card col-4 p-3" >
        <img class="card-img-top" src="https://ucarecdn.com/b49ab65c-b84a-42a2-b338-add84854cae8/Screenshotfrom20240924144230.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Festival Garagem</h5>
          <p class="card-text"><i class="ni ni-pin-3"></i> CAFUNDó </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
  
      <div class="card col-4 p-3" >
        <img class="card-img-top" src="https://ucarecdn.com/b49ab65c-b84a-42a2-b338-add84854cae8/Screenshotfrom20240924144230.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Festival Garagem</h5>
          <p class="card-text"><i class="ni ni-pin-3"></i> CAFUNDó </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      <div class="card col-4 p-3" >
        <img class="card-img-top" src="https://ucarecdn.com/b49ab65c-b84a-42a2-b338-add84854cae8/Screenshotfrom20240924144230.png" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Festival Garagem</h5>
          <p class="card-text"><i class="ni ni-pin-3"></i> CAFUNDó </p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </div>
    
  </div>
</template>
