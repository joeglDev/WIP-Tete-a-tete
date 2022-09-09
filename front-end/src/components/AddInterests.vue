<template>
  <div class="add-interests-container">
    <div class="item-interests interest-headline">
      <h1>Add your interests here</h1>
    </div>
    <div class="item-interests interest-1">
      <p>{{ interestsArray.values[0] }}</p>
      <p v-if="!interestsArray.values[0]">&nbsp;</p>
      <input placeholder="insert interest 1" />
      <button v-on:click="interestsSubmit" class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-2">
      <p>{{ interestsArray.values[1] }}</p>
      <p v-if="!interestsArray.values[1]">&nbsp;</p>
      <input placeholder="insert interest 2" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-3">
      <p>{{ interestsArray.values[2] }}</p>
      <p v-if="!interestsArray.values[2]">&nbsp;</p>
      <input placeholder="insert interest 3" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-4">
      <p>{{ interestsArray.values[3] }}</p>
      <p v-if="!interestsArray.values[3]">&nbsp;</p>
      <input placeholder="insert interest 4" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-5">
      <p>{{ interestsArray.values[4] }}</p>
      <p v-if="!interestsArray.values[4]">&nbsp;</p>
      <input placeholder="insert interest 5" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-6">
      <p>{{ interestsArray.values[5] }}</p>
      <p v-if="!interestsArray.values[5]">&nbsp;</p>
      <input placeholder="insert interest 6" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-7">
      <p>{{ interestsArray.values[6] }}</p>
      <p v-if="!interestsArray.values[6]">&nbsp;</p>
      <input placeholder="insert interest 7" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-8">
      <p>{{ interestsArray.values[7] }}</p>
      <p v-if="!interestsArray.values[7]">&nbsp;</p>
      <input placeholder="insert interest 8" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-9">
      <p>{{ interestsArray.values[8] }}</p>
      <p v-if="!interestsArray.values[8]">&nbsp;</p>
      <input placeholder="insert interest 9" />
      <button class="add-button">
        <img
          class="add-interest-button"
          src="../assets/add-interest-icon.svg"
          alt=""
        />
      </button>
    </div>
    <div class="item-interests interest-10">
      <p>{{ interestsArray.values[9] }}</p>
      <p v-if="!interestsArray.values[9]">&nbsp;</p>
      <input placeholder="insert interest 10" />
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
</script>





