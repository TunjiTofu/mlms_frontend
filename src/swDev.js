function swDev() {
    let swURL = `${process.env.PUBLIC_URL}/sw.js`;
  
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(swURL)
        .then((res) => console.log("SW", res))
        .catch((err) => console.log("Service Worker not registeed", err));
    }
  }
  
  export default swDev;
   