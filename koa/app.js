const Koa = require("./application");
const app = new Koa();

app.use(async (ctx, next) => {
  console.error(1);
  await next();
  console.error(8);
});

app.use(async (ctx, next) => {
  console.error(2);
  await next();
  console.error(7);
});

app.use(async (ctx, next) => {
  console.error(3);
  await next();
  console.error(6);
});

app.use(async (ctx, next) => {
  console.error(4);
  await next();
  console.error(5);
});

app.listen(3000, () => {
  console.error("Server is Running At Port 3000");
});

function format(target) {
  // .123456789 Number(target) === 0.123456789
  return String(Number(target)).replace(/\d+/, (int) =>
    int.replace(/(?=(\B)(\d{3})+$)/g, ",")
  );
}

console.log(format("123456789.123456789"));
