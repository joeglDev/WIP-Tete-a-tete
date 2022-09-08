<template>
  <div class="add-interests-container">
    <div class="item-interests interest-headline">
      <h1>Add your interests here</h1>
    </div>
    <div class="item-interests interest-1">
      <p>Message is: {{ interestInput1 }}</p>
      <input v-model="interestInput1" placeholder="insert interest 1" />
      <button v-on:click="interestsSubmit" class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-2">
      <p>Message is: {{ interestInput2 }}</p>
      <input v-model="interestInput2" placeholder="insert interest 2" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-3">
      <p>Message is: {{ interestInput3 }}</p>
      <input v-model="interestInput3" placeholder="insert interest 3" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-4">
      <p>Message is: {{ interestInput4 }}</p>
      <input v-model="interestInput4" placeholder="insert interest 4" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-5">
      <p>Message is: {{ interestInput5 }}</p>
      <input v-model="interestInput5" placeholder="insert interest 5" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-6">
      <p>Message is: {{ interestInput6 }}</p>
      <input v-model="interestInput6" placeholder="insert interest 6" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-7">
      <p>Message is: {{ interestInput7 }}</p>
      <input v-model="interestInput7" placeholder="insert interest 7" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-8">
      <p>Message is: {{ interestInput8 }}</p>
      <input v-model="interestInput8" placeholder="insert interest 8" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-9">
      <p>Message is: {{ interestInput9 }}</p>
      <input v-model="interestInput9" placeholder="insert interest 9" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-10">
      <p>Message is: {{ interestInput10 }}</p>
      <input v-model="interestInput10" placeholder="insert interest 10" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps } from "vue";
import { interestsStore } from "../stores/interestsStore";
const interestsArray = interestsStore();
const props = defineProps([]);

const interestsSubmit = (event) => {
  event.preventDefault();

  interestsArray.setInterestsArray({
    values: ["sol", null, null, null, null, null, null, null, null, null],
  });
  console.log(interestsArray);
};
</script>
