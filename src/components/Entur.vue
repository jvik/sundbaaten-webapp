<template>
  <div>
    <v-row align="center">
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
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
    <v-row>
      <v-col>
        <ApolloQuery
          :query="require('../graphql/StopPlace.gql')"
          :variables="{ id: currentStopPlace.nsrId, numberOfDepartures }"
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
                :headers="headers"
                :items="data.stopPlace.estimatedCalls"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item.aimedDepartureTime="{ item }">
                  <span>{{new Date(item.aimedDepartureTime).toLocaleTimeString()}}</span>
                </template></v-data-table>
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
  </div>
</template>

<script>
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
          text: "Avgangstid",
          align: "start",
          sortable: true,
          value: "aimedDepartureTime"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
