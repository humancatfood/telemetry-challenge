export const sanitizeData = data => {

  return new Promise((resolve, reject) => {

    try
    {
      const {
        control: {flaps, landing_gear},
        telemetry: {airspeed, altitude}
      } = JSON.parse(data);

      if (airspeed < 0 ||     // planes can't fly backwards
          altitude < 0 ||     // planes can't fly underground
          altitude > 100000)  // this dashboard is not for spaceships
      {
        reject(`Received (probably) invalid data: ${ data }`);
      }
      else
      {
        resolve({
          control: { flaps, landing_gear},
          telemetry: {airspeed, altitude}
        });
      }

    }
    catch (error)
    {
      reject(`Received incorrectly formatted data: ${ data }`);
    }

  });

};
