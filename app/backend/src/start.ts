import { server } from "./server";

server.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server started at ${process.env.NODE_HOST}:${process.env.SERVER_PORT}`
  );
});
