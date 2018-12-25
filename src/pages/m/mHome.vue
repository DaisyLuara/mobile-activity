<template>
  <div class="mHome">
    <router-view/>
  </div>
</template>

<script>
import { reCalculateRem } from "@/mixins/reCalculateRem";
export default {
  name: "mSiteHome",
  mixins: [reCalculateRem]
};
</script>
