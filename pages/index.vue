<template>
  <div class="main-viewer">
    <v-row class="h-100 ma-0">
      <!-- <template v-for="(player, key, index) in scores"> -->
        <!-- <v-col :key="key" class="d-flex flex-column justify-center text-center">
          <div>
            <h1>{{ player.name }}</h1>
          </div>
          <div>
            <h1 class="score">{{ player.score }}</h1>
          </div>
          <div>
            <v-btn small fab outlined depressed class="mr-3" @click="changeScore(key, -1)">
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
            <v-btn small fab outlined depressed  @click="changeScore(key, 1)">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </div>
        </v-col> -->
        <!-- <div v-if="index < Object.keys(scores).length - 1" class="separator h-100" /> -->
        <!-- </template> -->
      <v-col class="d-flex flex-column justify-center text-center" v-if="scores[first]">
        <div>
          <h1>{{ scores[first].name }}</h1>
        </div>
        <div>
          <h1 class="score">{{ scores[first].score }}</h1>
        </div>
        <div>
          <v-btn small fab outlined depressed class="mr-3" @click="changeScore(first, -1)">
            <v-icon>
              mdi-minus
            </v-icon>
          </v-btn>
          <v-btn small fab outlined depressed  @click="changeScore(first, 1)">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </div>
      </v-col>
      <div class="separator h-100" />
      <v-col class="d-flex flex-column justify-center text-center" v-if="scores[second]">
        <div>
          <h1>{{ scores[second].name }}</h1>
        </div>
        <div>
          <h1 class="score">{{ scores[second].score }}</h1>
        </div>
        <div>
          <v-btn small fab outlined depressed class="mr-3" @click="changeScore(second, -1)">
            <v-icon>
              mdi-minus
            </v-icon>
          </v-btn>
          <v-btn small fab outlined depressed  @click="changeScore(second, 1)">
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </div>
      </v-col>
      <div class="action">
        <v-row>
          <v-col class="text-center d-flex align-center flex-column">
            <v-btn fab outlined depressed class="mb-3" @click="resetScore()">
              <v-icon>
                mdi-refresh
              </v-icon>
            </v-btn>
            <v-btn fab outlined depressed @click="swapPosition(first, second)">
              <v-icon>
                mdi-swap-horizontal
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-row>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: 'Homepage',
    data() {
      return {
        documentId: 'fP4pHVBVCqfC2o8uorce',
        first: 1,
        second: 2
      }
    },
    computed: {
      ...mapGetters(['scores'])
    },
    mounted() {
      this.init()
    },
    methods: {
      ...mapActions(['bindSessionsDocument']),
      async init () {
        try {
          await this.bindSessionsDocument({
            documentId: this.documentId
          })
        } catch (e) {
          console.error(e)
        }
      },
      changeScore(key, amount) {
        const payload = {...this.scores,
          [key]: {
            ...this.scores[key],
            score: this.scores[key].score + amount
          }
        }
        this.$fire.firestore
          .collection('sessions')
          .doc('fP4pHVBVCqfC2o8uorce')
          .update(payload)
      },
      resetScore () {
        const payload = {
          1: {
            name: 'Utara',
            score: 0
          },
          2: {
            name: 'Selatan',
            score: 0
          }
        }
        this.$fire.firestore
          .collection('sessions')
          .doc('fP4pHVBVCqfC2o8uorce')
          .update(payload)
      },
      swapPosition (first, second) {
        this.first = second
        this.second = first
      }
    }
  }
</script>
<style lang="scss">
.main-viewer {
  width: 100vw;
  height: 100vh;
}
.separator {
  /* border-left: 1px solid white;
  border-right: 1px solid white; */
}
.score {
  @media screen and (max-width: 959px) {
    font-size: 8rem;
  }
  font-size: 22rem;
}
.action {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  padding-top: 30px;
}
</style>
