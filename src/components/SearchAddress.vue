<template>
    <div class="col-10 offset-1">
      <div class="q-pa-md" style="max-width: 600px">
        <div class="q-gutter-md">
          <q-select filled v-model="searchAddressBy" :options="options" label="Pesquisar endereço por" />
          <template v-if="searchAddressBy == 'CEP'">
            <q-input
              v-model="cep"
              label="Informe o CEP"
              mask="##.###-###"
              hint="Formato: 00.000-000"
            />
          </template>
          <template v-else>
            <q-select
              v-model="uf"
              :options="Estados"
              label="Estado"
              behavior="menu"
            />
            <q-input
              v-model="cidade"
              label="Cidade"
            />
            <q-input
              v-model="rua"
              label="Rua"
            />
          </template>
          <q-btn label="Pesquisar" type="submit" color="primary" @click="searchAddress" />

          <template v-if="validation">
            <p>{{ message }}</p>
            <list-address
              title="Resultado da pesquisa"
              active
              :addresses="requestData"
            ></list-address>
          </template>
          <template v-if="isFetchingAddress">
            <p>Carregando...</p>
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
import { Estados } from '../constants/estados';
import ListAddress from 'src/components/ListAddress.vue';
import addressService from '../services/address';
import { Loading } from 'quasar';


var emptyArray: any[];

export default defineComponent({
  name: 'CompositionComponent',
  components: {
    ListAddress
  },
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
      Estados,
      options: [ 'CEP', 'Logradouro'],
      searchAddressBy: 'CEP',
      cep: '',
      uf: '',
      cidade: '',
      rua: '',
      validation: false,
      isFetchingAddress: false,
      requestData: emptyArray,
      message: '',
      error: {
        erro: true
      }
    };
  },
  methods: {
    searchAddress() {
      if (this.checkForm()) {
        this.showLoading();
        this.requestData = emptyArray;
        this.validation = false;
        this.isFetchingAddress = true;
        this.message = '';
        if (this.searchAddressBy == 'CEP') {
          let cepInput:string;
          cepInput = this.removeSpecialChar(this.cep);
          void addressService.getAddressByCep(cepInput).then(response => {
            if (JSON.stringify(this.error) !== JSON.stringify(response.data)) {
              this.requestData = [response.data];
            } else {
              this.message = 'Nenhum endereço encontrado nesse CEP.';
            }
            this.validation = true;
            this.isFetchingAddress = false;
            this.hideLoading();
          });
        } else {
          let localidade = encodeURI(this.cidade);
          let logradouro = encodeURI(this.rua);
          void addressService.getAddressByStreetName(this.uf, localidade, logradouro).then(response => {
            let data: Array<unknown> = Array.isArray(response.data) ? response.data : [];
            if (data.length > 0) {
              this.requestData = data;
            } else {
              this.message = 'Nenhum endereço encontrado com essas informações.';
            }
            this.validation = true;
            this.isFetchingAddress = false;
            this.hideLoading();
          });
        }
      } else {
        this.message = 'Favor preencher os campos corretamente';
        this.validation = true;
      }
    },
    removeSpecialChar(string: string) {
      return string != ''? string.replace(/[^0-9]/g, '') : '';
    },
    showLoading() {
      Loading.show();
    },
    hideLoading() {
      Loading.hide();
    },
    checkForm() {
      if (this.searchAddressBy == 'CEP') {
        return this.cep.length == 10 ? true : false
      } else {
        return this.uf !== '' && this.cidade.length >= 3 && this.rua.length >= 3 ? true : false;
      }
    }
  }
});
</script>
