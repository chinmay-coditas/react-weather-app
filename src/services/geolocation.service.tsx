export const geoCurrentLocation = async () => {
  return new Promise(async (resolve, reject) => {
    if ("geolocation" in navigator) {
      try {
        const position: any = await new Promise((innerResolve, innerReject) => {
          navigator.geolocation.getCurrentPosition(innerResolve, innerReject);
        });
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      } catch (error) {
        reject(error);
      }
    } else {
      reject(new Error("Geolocation is not available in this browser."));
    }
  });
};
