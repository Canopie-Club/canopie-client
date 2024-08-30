<template>
  <div class="template default">
    <div style="padding: 20px">
      <div class="nav">
        <div class="nav-links">
          <div v-for="route in menuRoutes" :key="route.path">
            <NuxtLink :to="route.path" :class="{active: isActive(route.path)}">{{ route.title }}</NuxtLink>
          </div>
        </div>
        <hr />
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const menuRoutes = useMenuRoutes();
const route = useRoute();

const isActive = (path: string) => {
  return route.path === path;
};

</script>

<style lang="scss">
.template.default {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    @apply text-2xl font-bold pb-2 mb-4;
  }

  p {
    @apply mb-4;
  }

  a {
    @apply text-indigo-500 decoration-0 hover:text-indigo-700;
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

  .nav {
    @apply mb-5;

    .nav-links {
      @apply flex gap-4 mb-5 flex-wrap;

      a {
        @apply hover:bg-indigo-100 p-2 rounded-md;

        &.active {
          @apply bg-indigo-200 hover:bg-indigo-100;
        }
      }
    }
  }
}
</style>
