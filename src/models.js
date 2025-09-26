import { scene, renderer } from "./scene.js";
import { gltf } from "./loaders.js";
import {
  fitObject,
  fixMaterialColorSpace,
  randomRingPosition,
  disposeObject,
} from "./utils.js";
import { DEFAULT_MODEL_TARGET_SIZE } from "./constants.js";

export class ModelManager {
  constructor(anim) {
    this.anim = anim;
    this.current = null;
    this.index = -1;
  }

  addGround(url) {
    // console.log("Ground:"+url)
    gltf.load(
      url,
      (g) => {
        const root = g.scene || g.scenes[0];
        root.position.set(0, 0, 0);
        fixMaterialColorSpace(root, renderer);
        scene.add(root);
      },
      undefined,
      (err) => console.warn("載入地面失敗", err)
    );
  }

  add(url, { randomPlace = true, autoPlay = true } = {}) {
    gltf.load(
      url,
      (g) => {
        const root = g.scene || g.scenes[0];
        fitObject(root, DEFAULT_MODEL_TARGET_SIZE + Math.random() * 0.6);
        root.position.copy(
          randomPlace ? randomRingPosition() : new THREE.Vector3(0, 0, -1.2)
        );
        fixMaterialColorSpace(root, renderer);
        if (this.current) {
          scene.remove(this.current);
          disposeObject(this.current);
        }
        this.current = root;
        scene.add(root);
        this.anim.add(root, g.animations, autoPlay);
      },
      undefined,
      (err) => console.warn("載入模型失敗", err)
    );
  }

  next(list) {
    this.index = (this.index + 1) % list.length;
    this.add(list[this.index]);
  }

  addAllRow(list) {
    list.forEach((url, i) => {
      // console.log("model:"+url)
      gltf.load(
        url,
        (g) => {
          const root = g.scene || g.scenes[0];
          root.position.set(i * 1 - list.length / 2, 0, -2);
          fixMaterialColorSpace(root, renderer);
          scene.add(root);
          this.anim.add(root, g.animations, true);
        },
        undefined,
        (err) => console.warn("載入模型失敗", err)
      );
    });
  }
}
