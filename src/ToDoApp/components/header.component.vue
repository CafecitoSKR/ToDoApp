<script>
export default {
  name: "HeaderComponent",
}

</script>

<template>
  <nav class="navbar">
    <picture class="logo">
      <img src="C:\Users\Alejandro\Desktop\Proyectos-VueJs\ToDoApp\src\assets\logo.jpg">
    </picture>
    <ul>
      <li><a href="#inicio">Inicio</a></li>
      <li><a href="#Alejandro">Alejandro Espino Flores</a></li>
    </ul>
  </nav>

</template>

<style scoped>
.navbar{
  display: flex;
  justify-content: space-between;
  background-color: black;
  position: sticky;
  width: 100%;
  height: 70px;
  align-items: center;
}
.logo img{
  width: 50px;
  height: 50px;
  margin-left: 20px;
}
.navbar ul{
  display: flex;
  width: 300px;
  justify-content: space-around;
}
.navbar ul li a {
  color: white;
  text-decoration: none;
  font-size: 20px;
}
.navbar ul li a:hover{
  color:blue;
  transition-duration: 0.4s;
}

</style>