<template>
    <div class="template default">
        <div style="padding: 20px;">
            <div class="nav" style="display: flex; gap: 20px;">
                <div v-for="route in menuRoutes" :key="route.path">
                    <NuxtLink :to="route.path">{{ route.title }}</NuxtLink>
                </div>
            </div>
            <hr />
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const menuRoutes = useMenuRoutes();

</script>

<style lang="scss" scoped>
.template {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;

    h1 {
        color: #2c3e50;
        border-bottom: 2px solid #ecf0f1;
        padding-bottom: 10px;
        margin-bottom: 20px;
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

    ul, ol {
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
        font-family: 'Courier New', Courier, monospace;
    }

    pre {
        background-color: #f8f8f8;
        padding: 15px;
        border-radius: 4px;
        overflow-x: auto;
        margin-bottom: 15px;
    }
}

</style>