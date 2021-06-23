<template>
  <div class="row">
    <search-address
      title="Search address"
      active
    ></search-address>
  </div>
</template>

<script lang="ts">
import SearchAddress from 'src/components/SearchAddress.vue';
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex',
  components: {
    SearchAddress
  }
});
</script>
