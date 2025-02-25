const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <script src="index.ts"></script>
  </body>
</html>
`;

const css = `body {
  background-color: #000;
  margin: 0;
  overflow: hidden;
}
`;

const base = `import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export class Base {
  protected clock: THREE.Clock;
  public camera: THREE.PerspectiveCamera;
  public scene: THREE.Scene;
  public renderer: THREE.WebGLRenderer;
  public controls: OrbitControls;
  
  constructor() {
    this.clock = new THREE.Clock();

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 100 );
    this.camera.position.set( 0, 0, 5 );

    // Renderer
    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setAnimationLoop( this.tick.bind( this ) );
    document.body.appendChild( this.renderer.domElement );

    // Controls
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enableDamping = true;
    this.controls.minDistance = 0.1;
    this.controls.maxDistance = 50;

    // Resize
    window.addEventListener( 'resize', this.onWindowResize.bind( this ) );
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  private tick() {
    const deltaTime = this.clock.getDelta();

    this.animate( deltaTime );
    this.controls.update();
  }

  public animate(_deltaTime: number) {}
}
`;

const setupFiles = {
  // "/index.html": {
  // 	code: indexHtml,
  //    hidden: true,
  // },
  "/styles.css": {
    code: css,
    hidden: true,
  },
  "/base.ts": {
    code: base,
    hidden: true,
  },
};

export default setupFiles;
