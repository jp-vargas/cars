const canvas = document.getElementById('canvas');
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width * 0.9, 3);
const car = new Car(road.getLaneCenter(1), 100, 40, 70, "KEYS");
const traffic = [
  new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
];

car.draw(ctx);

animate();

function animate() {
  traffic.forEach((car) => {
    car.update(road.borders, []);
  });
  car.update(road.borders, traffic);

  canvas.height = window.innerHeight;

  ctx.save();

  ctx.translate(0, -car.y + canvas.height * 0.7);

  road.draw(ctx);
  car.draw(ctx, "blue");
  traffic.forEach((car) => {
    car.draw(ctx, "red");
  });
  ctx.restore();
  requestAnimationFrame(animate);
}