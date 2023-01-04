const generateWorld = ({
  world,
  seed,
}: {
  world: {
    width: number;
    height: number;
    depth: number;
    chunkSize: number;
  };
  seed: any;
}) => {
  var random = alea(seed),
    w = world.width * world.chunkSize,
    h = world.height * world.chunkSize,
    d = world.depth * world.chunkSize,
    x = 200,
    y = 200,
    z = 50;

  const noise2D = createNoise2D(random);
  const noise3D = createNoise3D(random);

  var xd = x - w * 0.25,
    yd = y - h * 0.2,
    zd = z - d * 0.25;
  if (yd > 0) yd *= yd * 0.05;
  var xz = noise2D(x, z);
  var distance = (xd * xd + yd * yd * 32 + zd * zd) * 0.0004,
    density = noise3D(x / 32, y / 32, z / 32) - distance;
  if (density > -0.75) {
    return 3;
  }
  if (density > -0.85) {
    return 2;
  }
  if (density > -1.0) {
    return y > 32 + xz * 4 ? 1.0 : 2;
  }
  if (seed[0] === "6") {
    var density0 = noise3D(x / 32, 32, z / 32);
    if (
      density0 - xd * xd * 0.002 - zd * zd * 0.002 > -1.0 &&
      y > 32 &&
      y * 0.01 < noise2D(x / 4, z / 4) * noise2D(x / 32, z / 32)
    ) {
      return y > 48 + xz * 16 ? 5 : 4;
    }
  }
  if (seed[0] != "0") {
    if (
      density >
      -0.5 - y * 0.01 + noise2D(x / 4, z / 4) * noise2D(x / 32 + 5, z / 32 + 5)
    ) {
      return 3;
    }
  }

  return 0.0;
};

var seed = "1" + "x" + ~~(Math.random() * 10000000).toString();
location.hash = "seed=" + seed;
const voxelArray: any = generateWorld({
  world: {
    chunkSize: 32,
    width: 32,
    depth: 32,
    height: 2,
  },
  seed: "1x1481973",
});

console.log(voxelArray);
