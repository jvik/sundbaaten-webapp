<template>
  <div>
    <v-row justify="center">
      <v-col class="d-flex" cols="auto">
        <v-select
          :items="stopPlaces"
          label="Avgangssted"
          item-text="name"
          v-model="currentStopPlace"
          return-object
        ></v-select>
      </v-col>
    </v-row>
    <!-- <v-row justify="center">
      <v-col cols="auto" sm="4">
        <v-alert type="info">Rutetilbudet er innstilt fra 16. mars til over påske grunnet COVID-19.</v-alert>
      </v-col>
    </v-row> -->
    <v-row class="mb-12" justify="center">
      <v-col cols="auto">
        <TodayDeparture
          :id="currentStopPlace.nsrId"
          :startDate="timeNow"
          numberOfDepartures="50"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import moment from "moment";
import TodayDeparture from "./TodayDeparture";
export default {
  components: {
    TodayDeparture,
  },
  data() {
    return {
      currentStopPlace: { name: "Kirklandet", nsrId: "NSR:StopPlace:41263" },
      stopPlaces: [
        { name: "Kirklandet", nsrId: "NSR:StopPlace:41263" },
        { name: "Innlandet", nsrId: "NSR:StopPlace:38275" },
        { name: "Norlandet", nsrId: "NSR:StopPlace:40933" },
        { name: "Gomalandet", nsrId: "NSR:StopPlace:40241" },
      ],
      numberOfDepartures: 30,
    };
  },
  computed: {
    timeNow() {
      const now = moment().format("YYYY-MM-DDTHH:mm:ss.SSSZZ");
      return now;
    },
  },
};
</script>

<style lang="scss" scoped></style>
