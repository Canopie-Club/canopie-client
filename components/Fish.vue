<template>
    <div class="test-widget">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.test-widget {
    @apply cursor-pointer;
    @apply border border-amber-200 bg-amber-50 rounded-md p-4 text-amber-900 shadow-md;
    @apply hover:border-amber-600 hover:bg-amber-500 hover:text-amber-50 hover:shadow-lg;
    @apply transition-all duration-100;
    @apply flex flex-col gap-2 items-center justify-center;
}
</style>