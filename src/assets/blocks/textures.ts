import { TextureLoader } from "three";

import { dirtImg, grassImg, glassImg, woodImg, logImg } from "./images";

const dirtTexture = new TextureLoader().load(dirtImg);
const groundTexture = new TextureLoader().load(grassImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);
const logTexture = new TextureLoader().load(logImg);

export { dirtTexture, groundTexture, glassTexture, woodTexture, logTexture };
