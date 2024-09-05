<template>
  <div>
    <h1>Hello</h1>
    <!-- <div v-html="spaContent"></div> -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "spa",
});

// const subdomain = useSubdomain();
// const profile = useSiteInfo();
// const slug = useRoute().params.path;
// const spaContent = useSpaContent();

// const formattedSlug = computed(() => {
//   if (typeof slug === "string") return `/${slug}`;
//   return `/${slug.join("/")}`;
// });
</script>

<style scoped></style>
