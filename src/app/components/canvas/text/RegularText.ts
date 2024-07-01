import { Mesh, MeshBasicMaterial } from "three";
import {
  TextGeometry,
  TextGeometryParameters,
} from "three/examples/jsm/geometries/TextGeometry";
import {
  Font,
  FontData,
  FontLoader,
} from "three/examples/jsm/loaders/FontLoader";
import fontJson from "three/examples/fonts/helvetiker_regular.typeface.json";
import { Coordinate } from "@/app/game/config";

export class RegularText {
  public mesh: Mesh;
  private text: string;
  private options?: TextGeometryParameters;

  constructor(
    text: string,
    color: number,
    size: number,
    depth: number,
    position: Coordinate,
    rotation: Coordinate
  ) {
    const fontLoader = new FontLoader();
    const parsedJson = JSON.parse(JSON.stringify(fontJson));
    const font = fontLoader.parse(parsedJson);
    this.options = {
      font: font,
      size: size,
      depth: depth,
      // ...options,
    };

    const geometry = new TextGeometry(text, this.options);
    geometry.center();

    const material = new MeshBasicMaterial({ color: color });
    this.mesh = new Mesh(geometry, material);
    this.text = text;

    this.mesh.position.set(position.x, position.y, position.z);

    this.mesh.rotation.x = (Math.PI / 180) * rotation.x;
    this.mesh.rotation.y = (Math.PI / 180) * rotation.y;
    this.mesh.rotation.z = (Math.PI / 180) * rotation.z;
  }

  public updateText(text: string) {
    if (!this.mesh) {
      return;
    }
    const geometry = new TextGeometry(text, this.options);
    geometry.center();
    this.mesh.geometry.dispose();
    this.mesh.geometry = geometry;
    this.text = text;
  }
}
