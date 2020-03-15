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
        <TodayDeparture
          :id="currentStopPlace.nsrId"
          :startDate="timeNow"
          numberOfDepartures=10
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
    TodayDeparture
  },
  data() {
    return {
      currentStopPlace: { name: "Kirkelandet", nsrId: "NSR:StopPlace:41263" },
      stopPlaces: [
        { name: "Kirkelandet", nsrId: "NSR:StopPlace:41263" },
        { name: "Innlandet", nsrId: "NSR:StopPlace:38275" },
        { name: "Norlandet", nsrId: "NSR:StopPlace:40933" },
        { name: "Gomalandet", nsrId: "NSR:StopPlace:40241" }
      ],
      numberOfDepartures: 10
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
</style>
