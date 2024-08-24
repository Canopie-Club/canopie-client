<template>
    <form @submit.prevent="submitForm">
        <h3>
            Login!
        </h3>

        Session Key: {{ sessionKey }}

        <input type="text" v-model="username" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">

        <button action="submit">LOGIN</button>
        <div class="error" v-if="error">{{ error }}</div>
    </form>
</template>

<script setup lang="ts">
const router = useRouter();

const sessionKey = useSessionKey();

const username = ref('');
const password = ref('');
const error = ref<string | null>(null);

const submitForm = async () => {
    const response = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
            username: username.value,
            password: password.value
        }
    }).catch((e: Error) => {
        console.log("Faced error")
        console.log(e)
        error.value = e.message
    })

    if (!response) {
        return;
    }

    if (!response.success) {
        error.value = response.message;
    }

    error.value = null;

    sessionKey.value = response.user?.email || 'default';

    console.log(response)

    router.push('/')
}

</script>

<style lang="scss" scoped>
form {
    max-width: 400px;
    margin: auto;

    input {
        width: 100%;

    }

    .error {
        color: #d23e3e;
        margin-top: .75em;
        border-radius: .25em;
        padding: .5em;
        background: #e4e1e1ff;
    }
}
</style>