<template>
  <div class="template spa">
    <div style="padding: 20px">
      <div class="nav flex gap-4 mb-4 flex-wrap">
        <div v-for="route in menuRoutes" :key="route.path">
          <NuxtLink :to="`#${route.path}`">{{ route.title }}</NuxtLink>
        </div>
      </div>
      <hr />
      <div class="content p-2 py-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const menuRoutes = useMenuRoutes();
</script>

<style lang="scss">
.template.spa {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .nav {
    @apply flex gap-4 mb-4 flex-wrap;

    a {
      @apply hover:bg-rose-100 p-2 rounded-md text-rose-500;
    }
  }

  .spa-page {
    @apply p-2 rounded mb-4;

    &:nth-child(odd) {
      @apply bg-gray-100;
    }


    h1 {
    @apply text-2xl font-bold text-gray-800 pb-2 mb-4;
    }

    h2 {
      @apply text-xl font-bold text-gray-800 pb-2 mb-4;
    }

    h3 {
      @apply text-lg font-bold text-gray-800 pb-2 mb-4;
    }

    p {
      margin-bottom: 15px;
    }

    a {
      color: #db34bc;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #db34bc;
        // color: #ab4899;
        text-decoration: underline;
      }
    }

    ul,
    ol {
      margin-bottom: 15px;
      padding-left: 30px;
    }

    img {
      max-width: 100%;
      height: auto;
      margin: 15px 0;
    }

    blockquote {
      border-left: 4px solid #ecf0f1;
      padding-left: 15px;
      margin: 15px 0;
      font-style: italic;
      color: #7f8c8d;
    }

    code {
      background-color: #f8f8f8;
      padding: 2px 4px;
      border-radius: 4px;
      font-family: "Courier New", Courier, monospace;
    }

    pre {
      background-color: #f8f8f8;
      padding: 15px;
      border-radius: 4px;
      overflow-x: auto;
      margin-bottom: 15px;
    }
  }
}
</style>
