<template>
<div>
 <div class="sidenav">
         <div class="login-main-text">
            <slot name="heading"></slot>  
         </div>
      </div>
      <div class="main">
         <div class="col-md-6 col-md-6">
           <slot name="form"></slot>
         </div>
      </div>
      </div>
</template>


<script>
export default {
};
</script>
<style scoped>

.sidenav {
    height: 100vh;
    background-color: #000;
    overflow-x: hidden;
    padding-top: 20px;
}
.main {
    height: 100vh;
    float: right;
    width: 60vw;
}
@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
}

@media screen and (min-width: 768px){
    .main{
        margin-left: 40%; 
    }

    .sidenav{
        width: 40%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
    }
}


.login-main-text{
    margin-top: 20%;
    padding: 60px;
    color: #fff;
}

.login-main-text h2{
    font-weight: 300;
}

.btn-black{
    background-color: #000 !important;
    color: #fff;
    margin-right: 20px;
}
</style>