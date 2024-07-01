import * as THREE from "three";
import { TextConfig } from "../config";
import { Game } from "./Game";
import { RegularText } from "@/app/components/canvas/text/RegularText";
import { Tile } from "@/app/components/canvas/blocks/Tile";
import { RailLine } from "@/app/components/canvas/line/RailLine";
import { setUpCamera } from "@/app/components/canvas/camera/PerspectiveCamera";
import { CameraConfig, LightConfig } from "@/app/components/canvas/commonInterface";

const ruleConfig = {
  scorePerTap: 1,
  timeLimit: 20 * 1000, // milliSeconds
};
const tileConfig = {
  size: {
    x: 16,
    y: 2,
    z: 24,
  },
  moveSpeed: 13,
  space: 2,
  color: 0x22dd22,
};
const railConfig = {
  laneCount: 4,
  length: 260,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
};
const railLineConfig = {
  color: 0xffffff,
  lineWidth: 2,
};
const railFloorConfig = {
  size: {
    x:
      tileConfig.size.x * railConfig.laneCount +
      railLineConfig.lineWidth * (railConfig.laneCount + 1),
    y: 1,
    z: railConfig.length,
  },
  color: 0xffffff,
};

const textConfig = {
  score: {
    position: {
      x: railFloorConfig.size.x / 2,
      y: 50,
      z: 50,
    },
    rotation: {
      x: -10,
      y: 0,
      z: 0,
    },
    size: 20,
    depth: 1,
    color: 0xffffff,
    fontUrl:
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    isCenter: true,
  } as TextConfig,
  time: {
    position: {
      x: 80,
      y: 40,
      z: 180,
    },
    rotation: {
      x: 0,
      y: -75,
      z: 0,
    },
    size: 10,
    depth: 1,
    color: 0xffffff,
    fontUrl:
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    isCenter: true,
  } as TextConfig,
};

export class StepTile implements Game {
    public scene: THREE.Scene;
  //   public camera: THREE.PerspectiveCamera;

//   private raycaster: THREE.Raycaster;
//   public touch: THREE.Vector2;
  private light: THREE.DirectionalLight;
  private tileStartPositions: { x: number; y: number; z: number }[];
  private tiles: THREE.Mesh[];
  private movedDistance: number;
  private isTapTile: boolean;
  private texts: Map<string, RegularText>;
  private score: number;
  private startTimestamp: number;
  private isTimeUp: boolean;

  constructor(scene: THREE.Scene) {
    this.scene = scene;

    // camera setting
    // this.camera = new THREE.PerspectiveCamera(
    //   cameraConfig.fov,
    //   window.innerWidth / window.innerHeight,
    //   1,
    //   9999
    // );
    // this.camera.position.x = cameraConfig.position.x;
    // this.camera.position.y = cameraConfig.position.y;
    // this.camera.position.z = cameraConfig.position.z;
    // this.camera.lookAt(
    //   new THREE.Vector3(
    //     cameraConfig.focusPosition.x,
    //     cameraConfig.focusPosition.y,
    //     cameraConfig.focusPosition.z
    //   )
    // );
    // this.camera = setUpCamera(
    //   window.innerWidth,
    //   window.innerHeight,
    //   cameraConfig
    // );

    // touch setting
    // this.raycaster = new THREE.Raycaster();
    // this.touch = new THREE.Vector2();
    // console.log("set touch");
    this.isTapTile = false;

    // light setting
    this.light = new THREE.DirectionalLight(
      lightConfig.color,
      lightConfig.intensity
    );
    this.scene.add(this.light);

    // rail setting
    this.createRail();

    // tile setting
    this.tileStartPositions = [];
    for (let i = 0; i < railConfig.laneCount; i++) {
      const tileStartPosition = {
        x:
          railConfig.position.x +
          railLineConfig.lineWidth +
          (tileConfig.size.x + railLineConfig.lineWidth) * i,
        y: railConfig.position.y,
        z: railConfig.position.z,
      };
      this.tileStartPositions.push(tileStartPosition);
    }
    this.tiles = [];
    this.movedDistance = 0;
    for (let i = 0; i < 10; i++) {
      this.moveTiles(tileConfig.size.z + tileConfig.space);
      this.createTile();
    }

    // text setting
    this.texts = new Map<string, RegularText>();
    this.score = 0;
    this.startTimestamp = Date.now();
    this.isTimeUp = false;
    this.createText(this.formatNumber(this.score), "score", textConfig.score);
    this.createText(
      this.formatTime(ruleConfig.timeLimit),
      "time",
      textConfig.time
    );
  }

  public execute() {
    let newTiles = [];
    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tiles[i].position.z > 400) {
        this.scene.remove(this.tiles[i]);
      } else {
        newTiles.push(this.tiles[i]);
      }
    }
    this.tiles = newTiles;

    if (this.isTapTile) {
      this.walk();
    }

    if (!this.isTimeUp) {
      let elapsedTime = Date.now() - this.startTimestamp;
      let remainingTime = ruleConfig.timeLimit - elapsedTime;
      if (remainingTime > 0) {
        this.updateText(this.formatTime(remainingTime), "time");
      } else {
        this.updateText(this.formatTime(0), "time");
        this.isTimeUp = true;
      }
    }
  }

  //   public onTap(e: TouchEvent) {
  //     // スマホのタッチ位置を計算
  //     console.log("touch", this.touch);
  //     this.touch.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
  //     this.touch.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;

  //     // レイキャストを設定
  //     this.raycaster.setFromCamera(this.touch, this.camera);
  //     const intersects = this.raycaster.intersectObjects(this.scene.children);
  //     console.log("intersects", intersects);
  //     const selectedBox = intersects.find((intersect) => {
  //       return intersect.object.name == "tile";
  //     });

  //     if (selectedBox) {
  //       // 立方体がクリックされたときのアクション
  //       console.log("intersects", intersects);
  //       this.onTileClick();
  //     }
  //   }

//   private onTileClick = () => {
//     this.score += 1;
//     this.updateText(this.formatNumber(this.score), "score");
//     this.isTapTile = true;
//   };

  private createRail() {
    const startXPoints = [];
    let startXPoint = railConfig.position.x;
    for (let i = 0; i < railConfig.laneCount + 1; i++) {
      startXPoints.push(startXPoint);
      startXPoint += railLineConfig.lineWidth;
      startXPoint += tileConfig.size.x;
    }

    for (let i = 0; i < startXPoints.length; i++) {
      const position = {
        x: startXPoints[i] + railLineConfig.lineWidth / 2,
        y: railConfig.position.y + railLineConfig.lineWidth / 2,
        z: railConfig.position.z + railConfig.length / 2,
      };
      const size = {
        x: railLineConfig.lineWidth,
        y: railLineConfig.lineWidth,
        z: railConfig.length,
      };
      //   const line = new Box(position, size, railLineConfig.color, {
      //     name: "line",
      //   });
      const line = new RailLine(position, size, railLineConfig.color, "line");
      this.scene.add(line.mesh);
    }
  }

  private createTile() {
    const randomLane = Math.floor(Math.random() * 1000) % 4;

    const position = {
      x: this.tileStartPositions[randomLane].x + tileConfig.size.x / 2,
      y: this.tileStartPositions[randomLane].y + tileConfig.size.y / 2,
      z: this.tileStartPositions[randomLane].z + tileConfig.size.z / 2,
    };
    // const tile = new Box(position, tileConfig.size, tileConfig.color, {
    //   name: "tile",
    //   roughness: 0.1,
    //   metalness: 0.2,
    // });
    const tile = new Tile(position, tileConfig.size, tileConfig.color, "tile");

    this.scene.add(tile.mesh);
    this.tiles.push(tile.mesh);
    this.movedDistance = 0;
  }

  private moveTiles(distance: number) {
    this.tiles.map((tile) => (tile.position.z += distance));
    this.movedDistance += distance;
  }

  private walk() {
    if (this.movedDistance < tileConfig.size.z + tileConfig.space) {
      // move all tiles
      this.moveTiles(tileConfig.moveSpeed);
    } else {
      // create tile at random
      this.createTile();

      // flag change default
      this.isTapTile = false;
    }
  }

  private createText(textStr: string, key: string, config: TextConfig) {
    // const text = new Text(
    //   {
    //     text: textStr,
    //     fontUrl: config.fontUrl,
    //     color: config.color,
    //     position: config.position,
    //     rotation: config.rotation,
    //     isCenter: config.isCenter,
    //   },
    //   { size: config.size, depth: config.depth }
    // );
    const text = new RegularText(
      textStr,
      config.color,
      config.size,
      config.depth,
      config.position,
      config.rotation
    );
    console.log("textObject", text);
    this.scene.add(text.mesh!);
    this.texts.set(key, text);
  }

  private updateText(textStr: string, key: string) {
    const text = this.texts.get(key);
    // text?.updateText({ text: textStr });
    text?.updateText(textStr);
  }

  private formatNumber(num: number) {
    return num.toString();
  }

  private formatTime(msTime: number) {
    let seconds = Math.floor(msTime / 1000);
    let milliseconds = msTime % 1000;
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}.${String(milliseconds).padStart(3, "0").substring(0, 2)}`;
  }
}
