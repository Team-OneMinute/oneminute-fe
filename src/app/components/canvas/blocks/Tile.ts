import { Coordinate } from "@/app/game/config";
import { BoxGeometry, Mesh, MeshStandardMaterial } from "three";

// const config = {
//   color: 0x22dd22,
// };

export class Tile {
  public mesh: Mesh;

  constructor(
    position: Coordinate,
    size: Coordinate,
    color: number,
    name?: string
  ) {
    const geometry = new BoxGeometry(size.x, size.y, size.z);
    const material = new MeshStandardMaterial({
      color: color,
      roughness: 0.1,
      metalness: 0.2,
    });
    this.mesh = new Mesh(geometry, material);
    this.mesh.position.x = position.x;
    this.mesh.position.y = position.y;
    this.mesh.position.z = position.z;
    this.mesh.name = name || "";
  }
}
