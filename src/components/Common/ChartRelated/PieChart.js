import { Doughnut} from "vue-chartjs";
export default {
  extends: Doughnut,
   data () {
    return {
      gradient: null,
      gradient2: null,
      gradient3: null,
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

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    
    this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

    this.gradient3.addColorStop(0, 'rgba(255, 0, 100, 0.7)')
    this.gradient3.addColorStop(0.5, 'rgba(255, 0, 255, 0.5)');
    this.gradient3.addColorStop(1, 'rgba(25, 50, 50, 0)');
  
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart( {
        hoverBackgroundColor: "red",
        hoverBorderWidth: 10,
        labels: ["Question", "Sharing", "Discussion"],
        datasets: [
          {
            label: "Data One",
            backgroundColor: [this.gradient, this.gradient2, this.gradient3],
            data: [1, 10, 5]
          }
        ]
      }, this.chartOptions);
  }
};
