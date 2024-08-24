<template>
    <div>
        <h1>Hello</h1>

        {{ routeInfo }}
    </div>
</template>

<script setup lang="ts">
const { ssrContext } = useNuxtApp()
const routeInfo = ssrContext?.routeInfo
</script>