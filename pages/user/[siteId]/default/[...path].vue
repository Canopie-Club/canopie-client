<template>
    <div>
        <MDC :value="page?.content"></MDC>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'default'
})

const site = useSiteInfo()
const route = useRoute()

const {data: page} = await useFetch('/api/page/info', {
    method: 'POST',
    body: {
        siteId: site.value?.id,
        path: route.path
    }
})

</script>

<style scoped>

</style>