import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, publicPath = "public", routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    //* Middlewares (Funciones que se ejecutan en todo momento que se pase por una ruta)
    //Si mi peticion tiene un body en formato JSON con este Middlewares lo pudo ver
    this.app.use(express.json());
    //El siguiente Middlewares sirve para cuando se manda la informacion en x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: true }));

    //* Public folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use(this.routes);

    //*Ayuda a los SPA
    this.app.get("/*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server running on por ${this.port}`);
    });
  }
}
