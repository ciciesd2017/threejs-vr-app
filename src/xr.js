import { renderer, camera, scene, THREE } from "./scene.js";
import { VRButton } from "https://unpkg.com/three@0.161.0/examples/jsm/webxr/VRButton.js";

export function mountVR() {
  document.body.appendChild(VRButton.createButton(renderer));
}

renderer.xr.addEventListener("sessionstart", () => {
  const xrCam = renderer.xr.getCamera();
  if (xrCam.isArrayCamera && xrCam.cameras?.length >= 2) {
    const left = xrCam.cameras[0];
    const right = xrCam.cameras[1];
    left.layers.enable(1);
    right.layers.enable(2);
    camera.layers.disable(1);
    camera.layers.disable(2);
  }
});

function buildRay() {
  const geo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -1),
  ]);
  const mat = new THREE.LineBasicMaterial({});
  const line = new THREE.Line(geo, mat);
  line.name = "ray";
  line.scale.z = 2;
  return line;
}

export function createControllers(onSelectEnd) {
  const c0 = renderer.xr.getController(0);
  const c1 = renderer.xr.getController(1);
  c0.add(buildRay());
  c1.add(buildRay());
  scene.add(c0, c1);
  c0.addEventListener("selectend", onSelectEnd);
  c1.addEventListener("selectend", onSelectEnd);
}
