<template>
    <div>
        <h1>Default Theme</h1>
        <p>{{ subdomain }}</p>
        <p>{{ profile }}</p>
    </div>
</template>

<script setup lang="ts">
const subdomain = useSubdomain()
const profile = useSiteInfo()

</script>

<style scoped>

</style>