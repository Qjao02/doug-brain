<template>
  <div class="container">
    <div class="md-title">
      <h1 class="md-display-1">
        <md-divider></md-divider>
      </h1>
    </div>

    <form novalidate class="md-layout" @submit.prevent="submitEvent">
      <div
        class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size100 md-large-size-75 md-xlarge-size-75"
      >
        <md-field :class="getValidationClass('eventName')">
          <label for="first-name">Nome do Evento</label>
          <md-input name="event-name" id="event-name" v-model="form.eventName" :disabled="sending" />
          <span class="md-error" v-if="!$v.form.eventName.required">The first name is required</span>
          <span class="md-error" v-else-if="!$v.form.eventName.minlength">Invalid first name</span>
        </md-field>
      </div>

      <div
        class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-45 md-large-size-35 md-xlarge-size-35"
      >
        <md-datepicker v-model="form.eventDate" :class="getValidationClass('eventDate')" />
        {{form.eventDate}}
      </div>

      <div
        class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-100 md-large-size-75 md-xlarge-size-75"
      >
        <md-field :class="getValidationClass('subject')">
          <label for="subject">Assunto</label>
          <md-textarea name="subject" id="subject" v-model="form.subject" :disabled="sending" />
          <span class="md-error" v-if="!$v.form.subject.required">o assunto não pode ser vazia</span>
          <span class="md-error" v-else-if="!$v.form.subject.minlength">Invalid first name</span>
        </md-field>
      </div>

      <div
        class="md-layout-item md-xsmall-size-100 md-small-size-100 md-medium-size-100 md-large-size-75 md-xlarge-size-75"
      >
        <md-button type="submit" class="md-raised md-primary" :disabled="sending">Criar Evento</md-button>
      </div>
    </form>
    <div class="loading-overlay" v-if="loading">
      <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { format, log } from "util";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

var config = {
  headers: {
    Authorization: localStorage.Token
  }
};

export default {
  mixins: [validationMixin],

  data: () => ({
    form: {
      eventName: null,
      subject: null,
      eventDate: new Date()
    },
    sending: false,
    loading: false
  }),

  validations: {
    form: {
      eventName: {
        required,
        minLength: minLength(3)
      },
      eventDate: {
        required
      },
      subject: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(100)
      }
    }
  },

  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },

    submitEvent() {
      let now = new Date();
      let evento = {
        nome: this.form.nome,
        data_evento: this.form.eventDate,
        assunto: this.form.subject
      };

      axios
        .post(process.env.ROOT_API.concat("eventos/"), evento, config)
        .then(response => {
          alert(response);
          this.loading = false
        })
        .catch(e => {
          alert(e);
          this.loading = false
        });

      this.loading = true;
  
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>