<template>
  <div class="md-app-container">
    <div class="md-title">
      <h1 class="md-display-1">
        <md-divider></md-divider>
      </h1>
    </div>

    <div class="md-content">
      <md-button
        class="md-dense md-raised md-primary"
        @click="setActiveCreateDialog(true)"
      >Novo Professor</md-button>
    </div>

    <div class="md-content">
      <md-table v-model="professores" md-card @md-selected="onSelect">
        <md-table-toolbar class="md-primary">
          <h1 class="md-title">Professores</h1>
        </md-table-toolbar>

        <md-table-row
          slot="md-table-row"
          slot-scope="{ item }"
          :class="getClass(item)"
          md-selectable="single"
          @click="setActiveUpdateDialog(true)"
        >
          <md-table-cell md-label="Nome" md-sort-by="nome">{{ item.nome }}</md-table-cell>
          <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
          <md-table-cell md-label="Lattes" md-sort-by="lattes">{{ item.lattes }}</md-table-cell>
          <md-table-cell
            md-label="Departamento"
            md-sort-by="departamento"
          >{{ item.departamento.nome }}</md-table-cell>
        </md-table-row>
      </md-table>

      <p>Selected:</p>

      {{ selected }}
      <div v-if="selected.nome != null">
        <!-- Dialog para update de Professor -->
        <md-dialog :md-active.sync="activeUpdateDialog">
          <md-dialog-title class="md-title-dialog">Agora é so customizar estes campos =)</md-dialog-title>
          <md-divider></md-divider>
          <md-dialog-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-45">
                <md-field>
                  <label>Nome:</label>
                  <md-input v-model="selected.nome"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-size-45">
                <md-field>
                  <label>Email:</label>
                  <md-input v-model="selected.email"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-size-45">
                <md-field>
                  <label>Lattes:</label>
                  <md-input v-model="selected.lattes"></md-input>
                </md-field>
              </div>

              <div class="md-layout-item md-size-45">
                <label for="departamento">Departamento</label>
                <md-field>
                  <md-select
                    name="departamento"
                    id="departamento"
                    v-model="selected.departamento"
                    :placeholder="selected.departamentoInfo.nome"
                  >
                    <md-option
                      v-for="departamento in departamentos"
                      :key="departamento.id"
                      :value="departamento.id"
                    >{{ departamento.nome }}</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            {{selected}}
          </md-dialog-content>
          <div class="md-layout-item md-layout md-gutter">
            <div class="md-layout-item md-size-4">
              <md-button class="md-raised md-accent" @click="setDeleteAlert(true)">DELETAR</md-button>
            </div>
            <md-button class="md-primary" @click="setActiveUpdateDialog(false)">fechar</md-button>
            <md-button class="md-primary" @click="updateProfessor">Salvar</md-button>
          </div>
        </md-dialog>

        <!-- dialog para confirmação de exclusão do professor-->
        <div class="delete-alert">
          <md-dialog :md-active.sync="activeDeleteAlert">
            <md-dialog-title class="md-title-dialog">Tem certeza que deseja remover este professor ?</md-dialog-title>
            <md-dialog-content>As informações deletadas não podem ser recuperadas</md-dialog-content>

            <md-dialog-actions>
              <md-button class="md-primary" @click="setDeleteAlert(false)">cancelar</md-button>
              <md-button class="md-primary" @click="deleteProfessor()">DELETAR</md-button>
            </md-dialog-actions>
          </md-dialog>
        </div>
      </div>

      <!-- Dialogo para criação de Novo Professor -->
      <md-dialog :md-active.sync="activeCreateDialog">
        <md-dialog-title class="md-title-dialog">Agora é so customizar estes campos =)</md-dialog-title>
        <md-divider></md-divider>
        <md-dialog-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-45">
              <md-field>
                <label>Nome:</label>
                <md-input v-model="newProfessor.nome"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-size-45">
              <md-field>
                <label>Email:</label>
                <md-input v-model="newProfessor.email"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-size-45">
              <md-field>
                <label>Lattes:</label>
                <md-input v-model="newProfessor.lattes"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-size-45">
              <label for="departamento">Departamento</label>
              <md-field>
                <md-select
                  name="departamentoSelect"
                  id="departamentoSelectId"
                  v-model="newProfessor.departamento"
                >
                  <md-option
                    v-for="departamento in departamentos"
                    :key="departamento.id"
                    :value="departamento.id"
                  >{{ departamento.nome }}</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
        </md-dialog-content>

        <md-dialog-actions>
          <md-button class="md-primary" @click="setActiveCreateDialog(false)">fechar</md-button>
          <md-button class="md-primary" @click="createProfessor">CRIAR</md-button>
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

var config = {
  headers: {
    Authorization: localStorage.Token
  }
};

export default {
  name: "TableSingle",
  data: () => ({
    selected: {},
    professores: [],
    departamentos: [],
    newProfessor: {},
    activeUpdateDialog: false,
    activeCreateDialog: false,
    activeDeleteAlert: false
  }),

  mounted() {
    this.getProfessores();
  },

  methods: {
    getClass: ({ id }) => ({
      "md-primary": id === 2,
      "md-accent": id === 3
    }),
    onSelect(item) {
      this.selected = { ...item };
      this.selected.departamentoInfo = this.selected.departamento;
      this.selected.departamento = this.selected.departamento.id;
    },

    setActiveCreateDialog(activeSignal) {
      this.activeCreateDialog = activeSignal;
    },

      setActiveUpdateDialog(activeSignal) {
      this.activeUpdateDialog = activeSignal;
    },

    setDeleteAlert(activeSignal) {
      this.activeDeleteAlert = activeSignal;
    },

    /* Obtém as instâncias de professores de doug-server */
    getProfessores() {
      axios
        .get(process.env.ROOT_API + "professores", config)
        .then(response => {
          this.professores = response.data;
          console.log(this.professores)
        })
        .catch(e => {
          console.log(e);
        });

      axios
        .get(process.env.ROOT_API + "departamentos", config)
        .then(response => {
          this.departamentos = response.data;
        })
        .catch(e => {
          alert(e);
        });
    },

    /*Cria uma nova instancia de professor no DB */

    createProfessor() {
  

      axios
        .post(process.env.ROOT_API + "professores/", this.newProfessor, config)
        .then(response => {
          alert("criado com sucesso");
          this.newProfessor = {}
          this.getProfessores();
          this.setActiveCreateDialog(false);
        })
        .catch(e => {
          console.log(e);
        });
    },

    /* Método para Atualizar uma instância de Professor */
    updateProfessor() {
      axios
        .put(
          process.env.ROOT_API + "professores/" + this.selected.id + "/",
          this.selected,
          config
        )
        .then(response => {
          alert("ok!");
          this.alert = false;
          this.getProfessores();
        })
        .catch(e => {
          alert("Algo deu errado =(");
          console.log(e);
        });
    },

    deleteProfessor() {
      axios
      .delete(
        process.env.ROOT_API + "professores/".concat(this.selected.id+'/'),
        config
      )
      .then((response) => {
        alert('deletado')
        this.setDeleteAlert(false)
        this.getProfessores()
      })
      .catch(e => {
        console.log(e)
      })
      
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../node_modules/vue-material/src/theme/engine";

.md-table + .md-table {
  margin-top: 16px;
}

.md-table-toolbar {
  display: flex;
  background: brown !important;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}

.md-dense {
  background: brown !important;
}
.md-title {
  color: white !important;
}

.md-title-dialog {
  color: #000000 !important;
}

.md-dialog {
  width: 90%;
}

.md-layout-item {
  height: 40%;
}

.delete-alert {
  z-index: 9999999 !important;
}
</style>
