<template>
  <v-app style="background-color: #ececec">
    <div
      class="h-100 pb-3"
      style="background-color: #ececec; overflow: hidden !important"
    >
      <loader />

      <v-breadcrumbs :items="itemsBreadcrumb" class="font-weight-bold py-1">
        <template v-slot:divider>
          <v-icon> mdi-chevron-right </v-icon>
        </template>
      </v-breadcrumbs>

      <v-card
        outlined
        elevation="0"
        width="auto"
        style="
          border-radius: 10px;
          overflow: hidden;
          height: calc(100% - 29px) !important;
        "
        class="mx-3 d-flex align-center flex-column"
      >
        <v-container fluid class="px-sm-10 px-3 h-100">
          <div class="h-100">
            <div class="py-10 mx-auto w-100 d-flex align-center">
              <router-link
                to="/proposta"
                class="d-flex align-center text-decoration-none"
              >
                <i class="las la-arrow-left" style="font-size: 1.5rem"></i>
              </router-link>

              <StepperPropose
                :items="[
                  'las la-paperclip',
                  'las la-user-clock',
                  'las la-check',
                ]"
              />
            </div>

            <div style="height: calc(100% - 44px - 93px)">
              <v-row class="w-100 mx-auto">
                <v-col cols="12" class="px-sm-0">
                  <h4 style="color: #707070" class="font-weight-regular">
                    Anexo de documentos
                  </h4>
                </v-col>
              </v-row>

              <v-row class="w-100 mx-auto">
                <v-col class="d-flex flex-column px-0 pt-0" cols="12">
                  <span class="subtitle-1 ml-8 text-light">
                    <i class="las la-file-alt"></i> Recomenda-se anexar ao menos
                    um documento pessoal e um comprovante de renda.
                  </span>

                  <span class="subtitle-1 ml-8 mt-2 text-light">
                    <i class="las la-paperclip"></i> Anexar documentações do
                    responsável e de todos os corresponáveis.
                  </span>
                </v-col>
              </v-row>

              <div class="mt-10">
                <v-slide-group show-arrows>
                  <v-slide-item
                    v-for="(anexo, index) in getAttachments"
                    :key="index"
                    class="mx-3"
                    v-bind:class="{ 'ml-2': index === 0 }"
                  >
                    <CardAnexo
                      :anexo="anexo"
                      :viewResponsible="true"
                      :viewDelete="true"
                      :viewType="true"
                      :index="index"
                    />
                  </v-slide-item>

                  <v-slide-item>
                    <div style="width: 100px">
                      <DialogAnexo />
                    </div>
                  </v-slide-item>
                </v-slide-group>
              </div>
            </div>

            <div class="w-100 d-flex justify-end">
              <v-btn
                @click="redirect"
                class="text-none ml-auto"
                large
                rounded
                color="primary"
              >
                <span>Enviar para análise</span>
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import DialogAnexo from "@/views/velofianca/propose/dialogs/DialogNovoAnexo.vue";
import CardAnexo from "@/views/velofianca/propose/cards/CardAnexo.vue";
import StepperPropose from "./StepperPropose.vue";
import { mapGetters } from "vuex";
import { GET_HANDLE_STEP, GET_LOADING } from "@/core/store/core.module.js";
import { updatePropose } from "@/core/service/core.service.js";
import { getAttachments } from "@/core/service/velo-fianca/attachment.service.js";
import { GET_ATTACHMENT } from "@/core/store/velo-fianca/attachment.module.js";
import Loader from "../../components/widgets/Loader.vue";

export default {
  components: {
    DialogAnexo,
    StepperPropose,
    CardAnexo,
    Loader,
  },

  data() {
    return {
      itemsBreadcrumb: [
        {
          text: "Anexar Documentos",
          disabled: true,
          to: "/",
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["getAttachments"]),
  },

  methods: {
    redirect() {
      if (this.getAttachments.length > 0) {
        this.$router.push("/aguardando-analise");
        updatePropose(
          JSON.stringify({
            id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
            status: 4,
          })
        );
      } else {
        this.$toast.error("Você precisa anexar algum documento");
      }
    },

    async listAttachment() {
      this.$store.dispatch(GET_LOADING, true);

      try {
        const { data } = await getAttachments(
          JSON.parse(sessionStorage.getItem("data")).objectPropose.id
        );

        if (data.count > 0) {
          const result = data.return.map((item) => {
            return {
              id: item.idfile,
              path: item.path,
              name: item.namefile,
              type: item.typefile,
              responsible: item.nameperson,
              link: item.linkfile,
              idProposePersonDocuments: item.idfiancavelopersondocuments,
            };
          });

          this.$store.dispatch(GET_ATTACHMENT, result);

          sessionStorage.setItem(
            "data",
            JSON.stringify({
              ...JSON.parse(sessionStorage.getItem("data")),
              propertydocuments: result,
            })
          );
        }
      } catch (error) {
        this.$toast.error(
          "Não foi possivel trazer os arquivos anexados, tente novamente mais tarde"
        );

        console.log(error);
      }

      this.$store.dispatch(GET_LOADING, false);
    },

    getNameFile(link) {
      const parts = link.split("/");
      const nameFile = parts[parts.length - 1].split("?dl")[0];

      return nameFile;
    },
  },

  mounted() {
    this.$store.dispatch(GET_HANDLE_STEP, 1);

    if (sessionStorage.getItem("redirect") === null) {
      updatePropose(
        JSON.stringify({
          id: JSON.parse(sessionStorage.getItem("data")).objectPropose.id,
          status: 3,
        })
      );
    } else {
      sessionStorage.removeItem("redirect");

      this.listAttachment();
    }
  },
};
</script>

<style lang="scss"></style>
