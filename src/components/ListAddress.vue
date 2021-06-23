<template>
    <div class="col-10 offset-1">
      <div class="q-pa-md" style="max-width: 600px">
        <div class="q-gutter-md">
          <template v-if="addresses.length > 0">
            <h5>{{ title }}</h5>
            <p>{{ addresses.length }} resultado(s) </p>
            <q-list bordered separator>
              <q-item v-for="address in addresses" :key="address.cep">
                <q-item-section>
                  <q-item-label overline>CEP {{ address.cep }}</q-item-label>
                  <q-item-label>Logradouro: {{ address.logradouro }}</q-item-label>
                  <q-item-label caption lines="2">Complemento: {{ address.complemento !== '' ? address.complemento : 'Sem complemento' }}</q-item-label>
                </q-item-section>
                <q-item-section side top>
                  <q-item-label caption>{{ address.uf }}</q-item-label>
                  <q-item-label caption>{{ address.localidade }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import {
  defineComponent, PropType
} from '@vue/composition-api';
import {Address } from './models';

export default defineComponent({
  name: 'SearchAddress',
  props: {
    title: {
      type: String,
      required: true
    },
    addresses: {
      type: (Array as unknown) as PropType<Address[]>,
      default: () => []
    },
    active: {
      type: Boolean
    }
  },
  setup() {
    return {
      addressData: [],

    };
  },
});
</script>
