import { PerspectiveCamera, Raycaster, Scene, Vector2 } from "three";

export const onTouch = (
  e: TouchEvent,
  callBack: () => void,
  name: string,
  width: number,
  height: number,
  raycaster: Raycaster,
  camera: PerspectiveCamera,
  scene: Scene
) => {
  const touch = new Vector2();
  // スマホのタッチ位置を計算
  console.log("touch", touch);
  touch.x = (e.touches[0].clientX / width) * 2 - 1;
  touch.y = -(e.touches[0].clientY / height) * 2 + 1;

  // レイキャストを設定
  raycaster.setFromCamera(touch, camera);
  const intersects = raycaster.intersectObjects(scene.children);
  console.log("intersects", intersects);
  const selectedBox = intersects.find((intersect) => {
    return intersect.object.name == name;
  });

  if (selectedBox) {
    // 立方体がクリックされたときのアクション
    console.log("intersects", intersects);
    callBack();
  }
};
