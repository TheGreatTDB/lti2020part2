<template>
  <div>
    <Menubar :model="items">
      <template #start></template>
    </Menubar>
  </div>
</template>

<script>
export default {
  props: [],
  event: null,
  data: function() {
    return {
      items: [
        {
          label: "Namespaces",
          icon: "pi pi-fw pi-file",
          items: [
            {
              label: "List Namespaces",
              icon: "pi pi-fw pi-list",
              command: () => {
                this.changeTab("listNamespaces");
              }
            },
            {
              separator: true
            },
            {
              label: "Create Namespace",
              icon: "pi pi-fw pi-plus",
              command: () => {
                this.changeTab("createNamespace");
              }
            }
          ]
        },
        {
          label: "Nodes",
          icon: "pi pi-fw pi-desktop",
          items: [
            {
              label: "List Nodes",
              icon: "pi pi-fw pi-list",
              command: () => {
                this.changeTab("listNodes");
              }
            },
            {
              separator: true
            }
          ]
        },
        {
          label: "Pods",
          icon: "pi pi-fw pi-clone",
          items: [
            {
              label: "List Pods",
              icon: "pi pi-fw pi-list",
              command: () => {
                this.changeTab("listPods");
              }
            },
            {
              separator: true
            },
            {
              label: "Create Pod",
              icon: "pi pi-fw pi-plus",
              command: () => {
                this.changeTab("createPod");
              }
            }
          ]
        },
        {
          label: "Deployments",
          icon: "pi pi-fw pi-cloud-download",
          items: [
            {
              label: "List Deployments",
              icon: "pi pi-fw pi-list",
              command: () => {
                this.changeTab("listDeployments");
              }
            },
            {
              separator: true
            },
            {
              label: "Create Deployment",
              icon: "pi pi-fw pi-plus",
              command: () => {
                this.changeTab("createDeployment");
              }
            }
          ]
        },
        {
          label: "Services",
          icon: "pi pi-fw pi-mobile",
          items: [
            {
              label: "List Services",
              icon: "pi pi-fw pi-list",
              command: () => {
                this.changeTab("listServices");
              }
            },
            {
              separator: true
            }
          ]
        },
        {
          label: "Other",
          icon: "pi pi-fw pi-info",
          items: [
            {
              label: "List Secrets",
              icon: "pi pi-fw pi-lock",
              command: () => {
                this.changeTab("listSecrets");
              }
            },
            {
              separator: true
            }
          ]
        },
        {
          label: "Logout",
          icon: "pi pi-fw pi-power-off",
          style: { "background-color": "red", "position": "absolute", "right": "6px"},
          command: () => {
            this.logout();
          }
        }
      ]
    };
  },
  methods: {
    changeTab: function(tab) {
      this.$store.commit("changeTab", tab);
    },
    logout: function() {
      this.$store.commit("clearTab");
      this.$store.commit("clearToken");
    }
  },
  created() {}
};
</script>
<style scoped>
.p-menubar {
   font-size: 17px;
   height: 60%;
}
</style>