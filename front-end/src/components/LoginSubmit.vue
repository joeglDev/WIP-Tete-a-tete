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
 import axios from 'axios'

     export default {
        username: "",
        password: "",
        data() {
            return {
                username: '',
                password: '',
            }
        }, methods: {
            loginSubmit(event) {
                event.preventDefault()
                axios.post(
                `http://localhost:9090/login`, 
                {username: this.username, password: this.password},
                this.username = '',
                this.password = '',
                ).then((response) => {
                    console.log(response);
                }).catch((error)=>{console.log(error)})
            }, 
         
        }
    }

</script>
