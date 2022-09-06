<template>
    <form class="login-submit" @submit="loginSubmit">
        <label>Username:</label>
        <input type="email" required v-model="username">
        <label>Password:</label>
        <input type="password" required v-model="password">
        <input class="login-submit-button" type="submit" value="Submit info"/>
    </form>

    
</template>

<script>
    export default {
        username: "",
        password: "",
        data() {
            return {
                username: '',
                password: '',
            }
        }, methods: {
            loginSubmit(event){
                event.preventDefault()
                    const NewUsername= {
                    username : this.username,
                    password : this.password
            }
            this.$emit('user-information', NewUsername)
            console.log(NewUsername)
        }
    }
}


</script>


