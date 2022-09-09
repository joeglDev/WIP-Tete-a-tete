<template>
  <div class="join-us-container">
    <div class="item one">
      <img class="arrow-icon" src="../assets/arrow-icon.svg" />
    </div>
    <div class="item two"><h1 class="join-us-text">Join us today</h1></div>
    <div class="item three">
      <h1>Create an account, forever free of charge</h1>
    </div>
    <div class="item four"><h2>If you are already registered, sign in</h2></div>
    <div class="item five button-background">
      <router-link to="/login">
        <img
          v:on="/login"
          class="button-icon"
          src="../assets/button-icon.svg"
        />
      </router-link>
    </div>
    <div class="item six">
      <h2>
        Click here to create <br />
        an account today
      </h2>
    </div>
    <div class="item seven button-background">
      <router-link to="/login">
        <img class="button-icon" src="../assets/button-icon.svg" />
      </router-link>
    </div>
  </div>
</template>
