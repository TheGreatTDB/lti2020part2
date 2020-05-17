<template>
  <div>
    <br />
    <p>Volume Name:</p>
    <b-form-input class="w-25 mx-auto" v-model="nameVolume" placeholder="Volume Name" />

    <p>Size:</p>
    <b-form-input class="w-25 mx-auto" v-model="sizeVolume" placeholder="Size(GB)" />

    <p>Description:</p>
    <b-form-input class="w-25 mx-auto" v-model="descriptionVolume" placeholder="Small description" />

    <p />
    <b-button variant="outline-primary"  v-on:click.prevent="createVolume()">Create Volume</b-button>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      nameVolume: "",
      sizeVolume: "",
      descriptionVolume: "",
    };
  },
  methods: {
    createVolume: function() {
      var axiosCreateInstance = this.axios.create({
        headers: {
          "x-auth-token": this.$store.state.token,
          "Content-Type": "application/json"
        }
      });

      // this.teste();

      axiosCreateInstance
        .post("/volume/v3/" + this.$store.state.currentProject + "/volumes", {
          volume: {
            name: this.nameVolume,
            size: parseInt(this.sizeVolume),
            availability_zone: null,
            source_volid: null,
            description: this.descriptionVolume,
            multiattach: false,
            snapshot_id: null,
            backup_id: null,
            imageRef: null,
            volume_type: null,
            metadata: {},
            consistencygroup_id: null
          }
        })
        .then(response => {
          console.log(response);
          this.$emit('reload-volumes')
        })
        .catch(error => {
          console.log("Failed to create Volume");
          console.log(error);
        });
    }
    // teste: function() {
    //     console.log(this.instanceNetworks)

    //     this.instanceNetworks.forEach(network => {
    //         let aux = {uuid : network.id}
    //         this.instanceNetworksUuid.push(aux)
    //     })

    //     console.log(this.instanceNetworksUuid)
    // }
  }
};
</script>