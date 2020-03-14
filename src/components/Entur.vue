<template>
  <div>
    <v-row justify="center">
      <v-col
        class="d-flex"
        cols="auto"
        sm="4"
      >
        <v-select
          :items="stopPlaces"
          label="Avgangssted"
          item-text="name"
          v-model="currentStopPlace"
          return-object
        ></v-select>
      </v-col>
    </v-row>
    <v-row
      class="mb-12"
      justify="center"
    >
      <v-col cols="auto">
        <ApolloQuery
          :query="require('../graphql/StopPlace.gql')"
          :variables="{ id: currentStopPlace.nsrId, numberOfDepartures, startDate: timeNow }"
        >
          <template slot-scope="{ result: { loading, error, data } }">
            <!-- Loading -->
            <div
              v-if="loading"
              class="loading apollo"
            >Loading...</div>

            <!-- Error -->
            <div
              v-else-if="error"
              class="error apollo"
            >An error occured</div>

            <!-- Result -->
            <div
              v-else-if="data"
              class="result apollo"
            >
              <v-data-table
                fixed-header
                :headers="headers"
                :items="data.stopPlace.estimatedCalls"
                class="elevation-1"
                :hide-default-footer="true"
                hide-default-header
              >
                <template v-slot:item.aimedDepartureTime="{ item }">
                  <span>{{new Date(item.aimedDepartureTime).toLocaleTimeString()}}</span>
                </template>
                <template slot="no-data">
                  <span>
                    Ingen flere avganger i dag
                  </span>
                </template>
              </v-data-table>
            </div>

            <!-- No result -->
            <div
              v-else
              class="no-result apollo"
            >No result :(</div>
          </template>
        </ApolloQuery>
      </v-col>
    </v-row>
    <v-row class="pt-12">
      <v-col>
        <a href="https://jvik.no">Made by jvik</a>
        | <a href="https://github.com/jvik/sundbaaten-webapp">github repo</a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      id: "NSR:StopPlace:38275",
      currentStopPlace: { name: "Kirkelandet", nsrId: "NSR:StopPlace:41263" },
      stopPlaces: [
        { name: "Kirkelandet", nsrId: "NSR:StopPlace:41263" },
        { name: "Innlandet", nsrId: "NSR:StopPlace:38275" },
        { name: "Norlandet", nsrId: "NSR:StopPlace:40933" },
        { name: "Gomalandet", nsrId: "NSR:StopPlace:40241" }
      ],
      numberOfDepartures: 5,
      headers: [
        {
          align: "start",
          sortable: false,
          value: "aimedDepartureTime"
        }
      ]
    };
  },
  computed: {
    timeNow() {
      const now = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
      return now;
    }
  }
};
</script>

<style lang="scss" scoped>
table tbody tr td span {
  font-size: 1.5em;
}
</style>
