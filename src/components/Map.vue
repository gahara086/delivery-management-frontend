<template>
  <div>
    <h2>配送ルート</h2>
    <div id="map" style="width: 100%; height: 500px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

// Google Maps の型定義
declare global {
  interface Window {
    google: any;
  }
}

export default defineComponent({
  name: "DeliveryMap",
  props: {
    deliveryAddresses: {
      type: Array as () => string[],
      required: true,
    },
  },
  setup(props) {
    const map = ref<any>(null);
    const directionsService = ref<any>(null);
    const directionsRenderer = ref<any>(null);
    const markers: any[] = [];

    const initializeMap = () => {
      map.value = new window.google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: 35.6895, lng: 139.6917 },
          zoom: 10,
        }
      );
      directionsService.value = new window.google.maps.DirectionsService();
      directionsRenderer.value = new window.google.maps.DirectionsRenderer({
        map: map.value,
      });
    };

    const displayRoute = () => {
      if (!directionsService.value || !props.deliveryAddresses.length) return;

      const waypoints = props.deliveryAddresses.slice(1, -1).map((address) => ({
        location: address,
        stopover: true,
      }));

      directionsService.value.route(
        {
          origin: props.deliveryAddresses[0],
          destination:
            props.deliveryAddresses[props.deliveryAddresses.length - 1],
          waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response: any, status: string) => {
          if (status === "OK" && directionsRenderer.value && response) {
            directionsRenderer.value.setDirections(response);
            addMarkers(response);
          } else {
            console.error("ルート描画に失敗しました:", status);
          }
        }
      );
    };

    const addMarkers = (response: any) => {
      clearMarkers();

      const route = response.routes[0];
      const legs = route.legs;

      legs.forEach((leg: any, index: number) => {
        const marker = new window.google.maps.Marker({
          position: leg.start_location,
          map: map.value!,
          label: (index + 1).toString(),
        });

        markers.push(marker);
      });

      const endMarker = new window.google.maps.Marker({
        position: legs[legs.length - 1].end_location,
        map: map.value!,
        label: (legs.length + 1).toString(),
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        },
      });

      markers.push(endMarker);
    };

    const clearMarkers = () => {
      markers.forEach((marker) => marker.setMap(null));
      markers.length = 0;
    };

    onMounted(() => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
      script.async = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    });

    watch(
      () => props.deliveryAddresses,
      () => {
        displayRoute();
      }
    );

    return {};
  },
});
</script>
