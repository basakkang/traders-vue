<template>
  <b-row>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <h4 class="mb-0">
              <animated-integer v-bind:value="asset"></animated-integer>
            </h4>
            <p>ASSET</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">
              <animated-integer v-bind:value="ir"></animated-integer>
            </h4>
            <p>IR</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-warning">
          <b-card-body class="pb-0">
            <h4 class="mb-0">
              <animated-integer v-bind:value="ret"></animated-integer>
            </h4>
            <p>RET</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0">
              <animated-integer v-bind:value="tvr"></animated-integer>
            </h4>
            <p>TVR</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0">
              <animated-integer v-bind:value="cost"></animated-integer>
            </h4>
            <p>COST</p>
          </b-card-body>
        </b-card>
      </b-col>
      <b-col sm="6" lg="2">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0">
              <animated-integer v-bind:value="mdd"></animated-integer>
            </h4>
            <p>MDD</p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
import AnimatedInteger from '@/components/AnimatedInteger'
export default {
  components: { AnimatedInteger },
  props: {
    asset: {
      type: Number,
      default: 0
    },
    ir: {
      type: Number,
      default: 0
    },
    ret: {
      type: Number,
      default: 0
    },
    tvr: {
      type: Number,
      default: 0
    },
    cost: {
      type: Number,
      default: 0
    },
    mdd: {
      type: Number,
      default: 0
    }
  },
  data: function () {
    return {
    }
  }
}
</script>