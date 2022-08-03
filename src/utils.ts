const factorBase = (
  airplaneSpeed: number,
  windAngle: number,
  windSpeed: number,
): number => 60 / (airplaneSpeed - windSpeed * Math.cos(toRadians(windAngle)));

const magneticCap = (
  windSpeed: number,
  windAngle: number,
  airplaneSpeed: number,
): number =>
  windSpeed *
  Math.sin(toRadians(windAngle)) *
  factorBase(airplaneSpeed, toRadians(windAngle), windSpeed);

const windTime = (
  distance: number,
  airplaneSpeed: number,
  windAngle: number,
  windSpeed: number,
): number =>
  distance * factorBase(airplaneSpeed, toRadians(windAngle), windSpeed);

const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

export {factorBase, magneticCap, windTime, toRadians};
