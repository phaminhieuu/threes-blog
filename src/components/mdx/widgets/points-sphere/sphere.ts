const index = `import { Base } from "./base.ts";
import * as THREE from "three/webgpu";
import { OrbitControls } from "three/examples/jsm/Addons.js";

class App extends Base {
  constructor() {
    super();

    const pointsNumber = 3000;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const positions: number[][] = [];
    
    for (let i = 0; i < pointsNumber; i++) {
      const prog = i / pointsNumber;
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - 2 * prog);
      const x = Math.cos(theta) * Math.sin(phi);
      const z = Math.sin(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      
      positions.push([x, y, z]);
    }
        
    const dotMat = new THREE.MeshBasicNodeMaterial({
      color: new THREE.Color("#78A0F7")
    });
    
    const dotGeo = new THREE.PlaneGeometry(0.01, 0.01);

    const dots = new THREE.InstancedMesh(dotGeo, dotMat, pointsNumber);
    const obj = new THREE.Object3D();

    for (let i = 0; i < positions.length; i++) {
      const pos = new THREE.Vector3(
      	positions[i][0],
      	positions[i][1],
      	positions[i][2],
      );
      
      obj.position.copy(pos);
      obj.lookAt(pos.multiplyScalar(2));
      obj.updateMatrix();
      dots.setMatrixAt(i, obj.matrix);
    }

    dots.instanceMatrix.needsUpdate = true;
    this.scene.add(dots);
  }

  public animate() {
    this.renderer.render( this.scene, this.camera );
  }
}

new App();
`;

const files = {
  "/index.ts": {
    code: index,
    hidden: false,
  },
};

export default files;
