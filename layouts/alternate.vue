<template>
  <div class="template alternate">
    <div style="padding: 20px">
      <div class="nav" style="display: flex; gap: 20px">
        <div v-for="route in menuRoutes" :key="route.path">
            <NuxtLink :to="route.path" :class="{active: isActive(route.path)}">{{ route.title }}</NuxtLink>
        </div>
      </div>
      <div class="content border-2 border-blue-200 rounded-md p-4">
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
.template.alternate {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .nav {
    @apply flex gap-4 mb-4 flex-wrap;

    a {
      @apply hover:bg-blue-100 p-2 rounded-md;

      &.active {
        @apply bg-blue-500 text-white;
      }
    }
  }

  h1 {
    @apply text-2xl font-bold text-gray-800 pb-2 mb-4;
  }

  p {
    margin-bottom: 15px;
  }

  a {
    color: #3498db;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #2980b9;
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

  .user-bar {
    background: #dbdfdf;
    border-radius: 0.5em;
    padding: 0.5em 1.5em;

    &.anon {
      background: #e1d9ec;
    }
  }
}
</style>
