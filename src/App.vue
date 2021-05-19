<template>
  <div id="app">
    <router-link to="/" class="app-logo">
      <img src="@/assets/images/fasterpay.svg" alt="" />
      <h1>FasterPay</h1>
    </router-link>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./styles/mixins.scss";
#app {
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
h1 {
  font-size: 21px;
}
h2 {
  font-size: 16px;
}
h1,
h2 {
  font-weight: 600;
  font-style: normal;
  line-height: 1.4;
}
p {
  font-size: 14px;
  font-weight: normal;
}
body {
  margin: 0 25px;
  @include breakpoint-min(sm) {
    margin: 0 auto;
    max-width: 575px;
  }
}
body > * {
  font-family: Montserrat;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
a.app-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  text-decoration: none;
}
.app-logo img {
  margin-right: 8px;
  width: 41px;
  height: 59px;
}
.app-logo h1 {
  color: #070c11;
}
</style>
