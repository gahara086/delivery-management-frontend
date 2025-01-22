<template>
  <div>
    <h1>配送リストとルートマップ</h1>
    <Map />
    <DeliveryList />
  </div>
</template>

<script>
import Map from "../components/Map.vue";
import DeliveryList from "./DeliveryList.vue";

export default {
  components: {
    Map,
    DeliveryList,
  },
};
</script>
