<script setup>

// NOT USED - PROBABLY DELETE, CAN'T MAKE IT WORK WITH COMPONENT CURRENTLY

   defineProps(['title'])
defineEmits(['remove'])
</script>
<template>
    <li>
      <p>{{ title }}</p>
    <p>{{ cdescription }}</p>
    
    <button @click="$emit('remove')">Remove</button>
  </li>
</template>

