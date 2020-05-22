<template>
  <div>
    <DataTable
      :filters="filters"
      :paginator="true"
      :rows="10"
      :value="namespaces"
      style="margin-bottom: 2rem"
    >
      <template #header>
        <div style="line-height:1.87em" class="p-clearfix">
          <Button icon="pi pi-refresh" style="float: left" />Namespaces
        </div>
        <div style="text-align: right">
          <i class="pi pi-search" style="margin: 4px 4px 0 0"></i>
          <InputText v-model="filters['global']" placeholder="Global Search" size="50" />
        </div>
      </template>
      <Column :sortable="true" field="metadata.name" header="Name"></Column>
      <Column :sortable="true" field="status.phase" header="Status"></Column>
      <Column :sortable="true" field="metadata.creationTimestamp" header="Age"></Column>
      <Column :sortable="true" header="Options">
        <template #body="slotProps">
          <Button
            label="Delete"
            class="p-button-danger"
            v-on:click.prevent="deleteNamespace(slotProps.data)"
          ></Button>
        </template>
      </Column>
      <template #footer>In total there are {{namespaces ? namespaces.length : 0 }} namespaces.</template>
    </DataTable>
  </div>
</template>
<script>
export default {
  props: [],
  data: function() {
    return {
      namespaces: null,
      columns: null,
      filters: {}
    };
  },
  methods: {
    loadNamespaces: function() {
      var axiosNamespaces = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosNamespaces
        .get("/api/v1/namespaces")
        .then(response => {
          this.namespaces = response.data.items;
          console.log(this.namespaces);
        })
        .catch(error => {
          console.log("Failed to load Namespaces:");
          console.log(error);
        });
    },
    deleteNamespace: function(selectedNamespace) {
      var axiosDeleteNamespace = this.axios.create({
        headers: {
          Authorization: "Bearer " + this.$store.state.token
        }
      });

      axiosDeleteNamespace
        .delete("/api/v1/namespaces/" + selectedNamespace.metadata.name)
        .then(response => {
          console.log(response.data);
          this.namespaces.delete(selectedNamespace);
        })
        .catch(error => {
          console.log("Failed to delete selected Namespace");
          console.log(error);
        });
    }
  },
  created() {
    this.loadNamespaces();
  }
};
</script>