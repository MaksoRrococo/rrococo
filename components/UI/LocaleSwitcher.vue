<script setup lang="ts">


</script>

<template>
    <div class="locale-changer">
      <select v-model="$i18n.locale" class="locale-select">
        <option class="locale-option" v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale.toUpperCase() }}</option>
      </select>
    </div>
</template>

<style>
.locale-select {
  background-color: transparent;
  color: #e9c99f;
  font-size: 1.2rem;
  border: none;
  outline: none;
  cursor: pointer;
}

.locale-select::selected {
  border: none;
} 

.locale-option {
  background-color: #045B45;
  padding: 10px;
}


</style>