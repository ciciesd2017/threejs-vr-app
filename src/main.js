import { scene, camera, renderer, controls, THREE } from "./scene.js";
import { SKYBOXES, MODEL_URLS, GROUND_MODEL_URL } from "./constants.js";
import { SkyboxManager } from "./skybox.js";
import { AnimationManager } from "./animation.js";
import { ModelManager } from "./models.js";
import { AudioPlayer } from "./audio.js";
import { VideoScreen } from "./video.js";
import { mountVR, createControllers } from "./xr.js";
import { bindUI } from "./ui.js";

// 實例化核心模組
const sky = new SkyboxManager();
const anim = new AnimationManager();
const models = new ModelManager(anim);
const audioPlayer = new AudioPlayer();
const videoPanel = new VideoScreen();

// 初始化
mountVR();
models.addGround(GROUND_MODEL_URL);
sky.next(SKYBOXES);
models.addAllRow(MODEL_URLS);

// XR Controller 事件
createControllers((event) => {
  const hand = (event.data && event.data.handedness) || "unknown";
  if (hand === "left") models.next(MODEL_URLS);
  else sky.next(SKYBOXES);
});

// UI 綁定
bindUI({
  sky,
  models,
  anim,
  audioPlayer,
  videoPanel,
  lists: { SKYBOXES, MODEL_URLS },
});

// 視窗尺寸
addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// 主迴圈
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const delta = clock.getDelta();
  anim.update(delta);
  controls.update();
  sky.tickFollowCamera();
  renderer.render(scene, camera);
});
