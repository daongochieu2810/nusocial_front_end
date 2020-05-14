<template>
  <div>
    <p class="text">Notes</p>
    <b-form-checkbox
      id="checkbox-1"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
      <p class="text">Note 1</p>
    </b-form-checkbox>
    <b-form-checkbox
      id="checkbox-2"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
      <p class="text">Note 2</p>
    </b-form-checkbox>
    <b-form-checkbox
      id="checkbox-3"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
      <p class="text">Note 3</p>
    </b-form-checkbox>
    <b-form-checkbox
      id="checkbox-4"
      v-model="status"
      name="checkbox-1"
      value="accepted"
      unchecked-value="not_accepted"
    >
      <p class="text">Note 4</p>
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: "not_accepted"
    };
  }
};
</script>
<style scoped>
.text {
  color: white;
}
</style>