<script setup lang="ts">
const userStore = useUserStore()

onBeforeMount(() => {
  if (userStore.user) {
      return navigateTo('/admin')
    }
}),

definePageMeta({
    layout: 'auth'
})
</script>

<template>
   <div class="auth-wrapper">
        <div class="section auth-header">
            <div class="trapezoid"></div>
            
            <div class="header__text">
            <h1>Admin</h1>
            <p>Panel.</p>
            </div>
        </div>
        <section class="section sign-in">
            <AdminFormsLogin />
        </section>
</div>
</template>

<style scoped>
.auth-wrapper {
  width: 320px;
  height: 540px;
  padding-bottom: 20px;
  color: #fefefe;
  background: #fefefe;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.section {
  
  padding: 1rem;
}

.sign-in {
    margin-top: 10px;
}
.auth-header {
  position: relative;
  text-align: center;
  overflow: hidden;
}
.header__text {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 3.5rem 0 7rem;
}
.header__text > h1 {
  margin: 0;
  font-size: 2.5rem;
}
.auth-header > .trapezoid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 97%;
  transform: skewY(-10deg);
  transform-origin: top left;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background: linear-gradient(rgba(17, 38, 190, 0.8), rgba(17, 38, 190, 0.8)), url('https://images.pexels.com/photos/520936/pexels-photo-520936.jpeg?w=940&h=650&auto=compress&cs=tinysrgb');
  background-position: top center;
  background-attachment: fixed;
}
form {
  margin: 0 auto;
  max-width: 17rem;
  
}
form > * + * {
  margin-top: 1rem;
}
form > input {
  border: 0;
  border-bottom: 1px solid #1126be;
  border-radius: 0;
  width: 100%;
  height: 2rem;
  padding: 0 0 0.25rem 0;
  font-size: 1rem;
  color: #1126be;
  background: #fefefe;
}
form > input:focus {
  outline: none;
}
form > input::placeholder {
  color: #1126be;
}
form > button {
  margin-top: 2rem;
  border: 0;
  border-radius: 200px;
  width: 100%;
  padding: 0.85rem;
  font-size: 1rem;
  color: #fefefe;
  background: #1126be;
}
form > button:focus {
  outline: none;
}
form > p {
  margin: 0.25rem 0 0;
  text-align: center;
  color: #1126be;
}
.sign-up {
  display: none;
}
.opposite-btn1, .opposite-btn2 {
  cursor: pointer;
}

</style>