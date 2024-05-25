<script setup lang="ts">
import { ref } from 'vue';
import {
  getWeekDaysInMonth,
  daysInOffice,
  nextMonthMonth,
  nextMonthYear,
} from './service.ts';

/** Displays the month so it's 1 more than the internal month index*/
const month = ref(nextMonthMonth + 1);
const year = ref(nextMonthYear);
const days = ref(getWeekDaysInMonth());
const holidays = ref(0);
const pctRequired = ref(40);
const inOfficeDays = ref(
  daysInOffice(days.value, holidays.value, pctRequired.value)
);
const date = ref(new Date(year.value, month.value - 1));

function onChange() {
  const m = month.value - 1;
  days.value = getWeekDaysInMonth(m, year.value);
  inOfficeDays.value = daysInOffice(
    days.value,
    holidays.value,
    pctRequired.value
  );
  date.value = new Date(year.value, m);
}
</script>

<template>
  <h1>Calculate Days in Office</h1>
  <div class="grid-cols-2">
    <div>Month</div>
    <input v-model="month" @input="onChange" />
    <div>Year</div>
    <input v-model="year" @input="onChange" />
    <div class="font-bold pt">Selected</div>
    <div class="pt">
      {{ date.toLocaleString('en-US', { month: 'long', year: 'numeric' }) }}
    </div>
    <div class="pb">Weekdays</div>
    <span class="pb">{{ days }}</span>
    <div>Holidays and Vacation Days</div>
    <input v-model="holidays" @input="onChange" />
    <div>Percent In-office</div>
    <input v-model="pctRequired" @input="onChange" />
    <h2>Days in Office</h2>
    <h2>{{ inOfficeDays }}</h2>
  </div>
</template>

<style scoped>
.grid-cols-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.pb {
  padding-bottom: 1rem;
}
.pt {
  padding-top: 1rem;
}
</style>
