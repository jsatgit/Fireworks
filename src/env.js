const World = Matter.World;
const Engine = Matter.Engine;
const Render = Matter.Render;

class Env {
  constructor() {
    this.engine = Engine.create();
  }

  add(body) {
    World.add(this.engine.world, body);
  }

  remove(body) {
    World.remove(this.engine.world, body);
  }

  run() {
    Engine.run(this.engine);
    const render = Render.create({
        element: document.body,
        engine: this.engine,
        options: {
          wireframes: false
        }
    });
    Render.run(render);
  }
}

let env;

export default function getEnv() {
  if (!env) {
    env = new Env();
  }
  return env;
}
