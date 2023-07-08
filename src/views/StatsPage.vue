<template>
  <section class="charts-container">
    <DoughnutChart class="doughnut" :chartData="testData" :options="options" />
    <BarChart class="bar" :chartData="testBarData" :options="options" />
  </section>
  </template>
  
  <script lang="ts">
  import { BarChart, DoughnutChart } from 'vue-chart-3'
  import { Chart, registerables } from 'chart.js'
  
  Chart.register(...registerables)
  
  export default {
    name: 'Chart',
    components: {  DoughnutChart, BarChart },
data() {
  return {
    testData: {
      labels: [],
      datasets: [
        {
          data: null,
          backgroundColor: ['#FFADAD', '#FFD6A5', '#FDFFB6' , '#CAFFBF' , '#9BF6FF','#A0C4FF','#BDB2FF'],
        },
      ],
    },
    options: {
      plugins: {
        legend: { display: false},
      },
    },
    testBarData: {
      labels: [],
      datasets: [
        {
          data: null,
          backgroundColor: ['#D68AFF', '#8AFF8A', '#FF8AC9'],
        },
      ],
    },
  }
},
    created() {
    this.$store.dispatch({ type: 'loadToysChart' }).then(() => {
      this.testData.datasets[0].data = this.$store.getters.priceData
      this.testBarData.datasets[0].data = this.$store.getters.inventorysData
    })
    this.testData.labels = this.$store.getters.labels
    this.testBarData.labels = this.$store.getters.labels
  },
  }
 </script>
