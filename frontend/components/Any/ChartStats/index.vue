<template>
  <Line :data="{ ...data, datasets }" :options="options" />
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  labels: {
    type: Array,
    requried: true,
  },
  datasets: {
    type: Array,
    requried: true,
  },
});

const data = ref({
  labels: props.labels,
});

const colorDefault = "#1d1b20";
const colorOpacityDefault = "#1d1b2033";

const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: colorDefault,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: colorDefault,
      },
      grid: {
        color: colorOpacityDefault,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: colorDefault,
      },
      grid: {
        color: colorOpacityDefault,
      },
    },
  },
};
</script>
