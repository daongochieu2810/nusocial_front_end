import { Doughnut, mixins} from "vue-chartjs";
const {reactiveProp} = mixins
export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["options"],
   data () {
    return {
      gradient: null,
      gradient2: null,
      gradient3: null,
      gradient4: null,
      gradient5: null,
      chartOptions: {
        borderWidth: "10px",
      hoverBackgroundColor: "red",
      hoverBorderWidth: "10px",
       legend: {
            labels: {
                // This more specific font property overrides the global property
                fontColor: 'white'
            }
        }
      }
    }
  },
  mounted() {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient3 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
     this.gradient4 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
      this.gradient5 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

    this.gradient3.addColorStop(0, 'rgba(255, 0, 100, 0.7)')
    this.gradient3.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    this.gradient3.addColorStop(1, 'rgba(25, 50, 50, 0)');

    this.gradient4.addColorStop(0, 'rgba(100, 0, 0, 0.7)')
    this.gradient4.addColorStop(0.5, 'rgba(255, 100, 0, 0.5)');
    this.gradient4.addColorStop(1, 'rgba(100, 50, 50, 0)');

    this.gradient5.addColorStop(0, 'rgba(0, 0, 200, 0.7)')
    this.gradient5.addColorStop(0.5, 'rgba(200, 0, 255, 0.5)');
    this.gradient5.addColorStop(1, 'rgba(25, 50, 0, 0)');

    this.$emit("gradients", [this.gradient, this.gradient2, this.gradient3, this.gradient4, this.gradient5])
  
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart( this.chartData, this.options);
  }
};
