<template>
  <div class="subscribe-container">
    <div>
      <h3>Subscribe to our mailing list here</h3>
    </div>
    <div>
      <input
        class="email-box"
        type="text"
        placeholder="Enter Email"
        name="email"
        required
        v-model="email"
      />
    </div>
    <button @click="functionCaller">submit</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: "",
      }
    }, methods: {
      functionCaller() {
       this.resetInput()
      },
      resetInput() {
        this.email = ""
      }
    }
  }
</script>