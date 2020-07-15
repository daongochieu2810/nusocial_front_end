import {Line, mixins} from 'vue-chartjs'
const {reactiveProp} = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
  data () {
    return {
      gradient: null,
      gradient2: null
    }
  },
  props: ['options'],
  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    //this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
    this.$emit("gradient", this.gradient)
    
    /*this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');*/
    
    this.renderChart(this.chartData,this.options )

  }
}