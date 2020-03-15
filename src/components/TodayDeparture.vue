<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/StopPlace.gql')"
      :variables="{ id, numberOfDepartures, startDate }"
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
          <v-card>
            <v-card-title>
              Kommende avganger i dag
            </v-card-title>
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
                  <v-icon>mdi-alert</v-icon>
                  Ingen flere avganger
                </span>
              </template>
            </v-data-table>
          </v-card>

          <div v-if="data.stopPlace.estimatedCalls.length === 0">
            <v-row>
              <v-col>
                <NextDaysDeparture
                  :id="id"
                  :startDate="startDate"
                  :numberOfDepartures="numberOfDepartures"
                />
              </v-col>
            </v-row>
          </div>

        </div>

        <!-- No result -->
        <div
          v-else
          class="no-result apollo"
        >No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import NextDaysDeparture from "./NextDaysDeparture";
export default {
  data() {
    return {
      headers: [
        {
          align: "start",
          sortable: false,
          value: "aimedDepartureTime"
        }
      ]
    };
  },
  props: ["id", "numberOfDepartures", "startDate"],
  components: {
    NextDaysDeparture
  }
};
</script>

<style lang="scss" scoped>
table tbody tr td span {
  font-size: 1.2em;
}
</style>