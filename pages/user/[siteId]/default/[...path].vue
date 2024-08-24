<template>
    <div>
        <h1>Default Theme</h1>
        <p>{{ subdomain }}</p>
        <p>{{ profile }}</p>
        <p>Path: {{ formattedSlug }}</p>
    </div>
</template>

<script setup lang="ts">
const subdomain = useSubdomain()
const profile = useSiteInfo()
const slug = useRoute().params.path

const formattedSlug = computed(() => {
    if (typeof slug === 'string') return `/${slug}`
    return `/${slug.join('/')}`
})

</script>

<style scoped>

</style>