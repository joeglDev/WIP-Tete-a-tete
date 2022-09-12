<template>
  <div class="add-interests-container">
    <div class="item-interests interest-headline">
      <h1>Add your interests here</h1>
    </div>
    <div class="item-interests interest-1">
      <p>{{ interestsArray.values[0] }}</p>
      <p v-if="!interestsArray.values[0]">&nbsp;</p>
      <input placeholder="insert interest 1" id="element1" v-model="topic0" />
      <button v-on:click="interestsSubmit(0)" class="add-button">
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
      <input placeholder="insert interest 2" v-model="topic1"/>
      <button v-on:click="interestsSubmit(1)" class="add-button">
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
      <input placeholder="insert interest 3" v-model="topic2"/>
      <button v-on:click="interestsSubmit(2)" class="add-button">
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
      <input placeholder="insert interest 4" v-model="topic3"/>
      <button v-on:click="interestsSubmit(3)" class="add-button">
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
      <input placeholder="insert interest 5" v-model="topic4"/>
      <button v-on:click="interestsSubmit(4)" class="add-button">
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
      <input placeholder="insert interest 6" v-model="topic5"/>
      <button v-on:click="interestsSubmit(5)" class="add-button">
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
      <input placeholder="insert interest 7" v-model="topic6"/>
      <button v-on:click="interestsSubmit(6)" class="add-button">
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
      <input placeholder="insert interest 8" v-model="topic7"/>
      <button v-on:click="interestsSubmit(7)" class="add-button">
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
      <input placeholder="insert interest 9" v-model="topic8"/>
      <button v-on:click="interestsSubmit(8)" class="add-button">
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
      <input placeholder="insert interest 10" v-model="topic9"/>
      <button v-on:click="interestsSubmit(9)" class="add-button">
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
import axios from "axios";
import { userStore } from "../stores/user";

const interestsArray = interestsStore();
const profile = userStore();
const props = defineProps(["topic0", "topic1","topic2", "topic3", "topic4", "topic5", "topic6", "topic7", "topic8", "topic9" ]);

const interestsSubmit = (index) => {


  let copyinterests = interestsArray.values;
  copyinterests[index] = eval(`props.topic${index}`)
  //let prop = eval(`props.topic${index}`)
  
 
  interestsArray.setInterestsArray(copyinterests)
  // console.log(interestsArray.values, "state")
  const noNullsTopics = interestsArray.values.filter(topic => topic)
  // console.log(noNullsTopics, "no nulls")
 
//  (".add-button").on("submit", function() {
//     reset()
//    })
 
 

   axios
    .patch(`http://localhost:9090/users/${profile.user_id}/topics`, {new_topics: noNullsTopics})
    .then((response) => {
      if (response.status === 200) {
        interestsArray.setInterestsArray(response.data.updated_topics)     
        console.log(interestsArray.values)  
      
      }
    })
    .catch((error) => {
      if (error) {
        console.log(error)
    }
   })

}
</script>





