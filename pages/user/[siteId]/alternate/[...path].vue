<template>
    <div>
        <div v-html="page?.formattedContent"></div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'alternate'
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