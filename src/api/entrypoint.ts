import { server } from "./config/inversify";
server()
  .then((server) =>
    server.listen(3000, () => {
      console.log("[ok] - server running on port 3000");
    })
  )
  .catch((error) => console.log("[error] - server cannot start", error));
