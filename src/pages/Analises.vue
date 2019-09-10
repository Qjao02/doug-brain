<template>
  <div>
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-xsmall-size-100 md-small-size-100 md-large-size-69">
        <md-card class="md-card-primary">
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">WordCloud card</div>
              <div
                class="md-subhead"
              >WordCloud dizem as palavras que os usuários mais usam enquanto conversam com o chatbot</div>
            </md-card-header-text>
            <md-card-media>
              <img src="/assets/examples/avatar-2.jpg" alt="People" />
            </md-card-media>
          </md-card-header>
          <md-card-content>
            <wordcloud :data="defaultWords" nameKey="name" valueKey="value" color="Accent"></wordcloud>
          </md-card-content>
        </md-card>
      </div>
      <div class="md-layout-item md-size-35">
        <md-card>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">Mensagens Enviadas</div>
              <div class="md-subhead"></div>
            </md-card-header-text>

            <md-card-media>
              <img src="/assets/examples/avatar-2.jpg" alt="People" />
            </md-card-media>
          </md-card-header>
          <md-card-content>
            <line-chart :chart-data="datacollection"></line-chart>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.md-card {
  width: 320px;
  display: inline-block;
  vertical-align: top;
}
.md-card-primary {
  width: 100%;
  height: 550px;
}

.md-card-content {
  margin: 2px;
}

.chart-primary {
  margin-bottom: 5px;
}
</style>


<script>
import wordcloud from "vue-wordcloud";
import LineChart from "../components/charts/LineChart";

export default {
  name: "Media",
  components: {
    LineChart,
    wordcloud
  },

  data() {
    return {
      datacollection: {},
      myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
      defaultWords: [
        {
          name: "Cat",
          value: 26
        },
        {
          name: "fish",
          value: 19
        },
        {
          name: "things",
          value: 18
        },
        {
          name: "look",
          value: 16
        },
        {
          name: "two",
          value: 15
        },
        {
          name: "fun",
          value: 9
        },
        {
          name: "know",
          value: 9
        },
        {
          name: "teste",
          value: 20
        },
        {
          name: "good",
          value: 9
        },
        {
          name: "play",
          value: 6
        }
      ]
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: "Data One",
            borderColor: "#3446eb",
            fill: false,
            data: [this.getRandomInt(), this.getRandomInt()]
          },
          {
            label: "Data two",
            borderColor: "#f87979",
            fill: false,
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  }
};
</script>
