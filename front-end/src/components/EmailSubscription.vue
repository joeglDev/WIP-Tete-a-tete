<template>
  <div class="subscribe-container">
    <div>
      <h3>Subscribe to our mailing list here</h3>
    </div>
    <div class="email-submit-container">
      <input
        class="email-box"
        type="text"
        placeholder="Enter Email"
        name="email"
        required
        v-model="email"
      />
      <button class="email-submit-button" @click="functionCaller">submit</button>
    </div>
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