<template>
  <div>
    <ApolloQuery
      :query="require('../graphql/StopPlace64hours.gql')"
      :variables="{ id, numberOfDepartures, startDate }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <v-card>
            <v-card-title>
              Kommende dager
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon color="grey lighten-1">mdi-information-variant</v-icon>
                  </v-btn>
                </template>
                <span>Tabellen viser de ti neste avgangene</span>
              </v-tooltip>
            </v-card-title>

            <v-data-table
              :mobile-breakpoint="NaN"
              hide-default-header
              fixed-header
              :headers="headers"
              :items="data.stopPlace.estimatedCalls"
              class="elevation-1"
              :hide-default-footer="true"
            >
              <template v-slot:item.aimedDepartureTime="{ item }">
                <span>{{ convertTime(item.aimedDepartureTime)}}</span>
              </template>
              <template slot="no-data">
                <span>Ingen avganger funnet</span>
              </template>
            </v-data-table>
          </v-card>

          <div v-if="data.stopPlace.estimatedCalls.length === 0">{{data}}</div>
        </div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["id", "startDate", "numberOfDepartures"],
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
  methods: {
    convertTime(time) {
      return moment(time)
        .locale("nb")
        .format("dddd Do MMMM, hh:mm");
    }
  }
};
</script>

<style lang="scss" scoped>
table tbody tr td span {
  font-size: 1.2em;
}
</style>