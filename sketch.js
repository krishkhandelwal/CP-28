const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var bodies = [];
let boy, boyimage;

function preload() {
	boyimage = loadImage("boy.png");
}

function setup() {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world;

	boy = createSprite(200, 600);
	boy.addImage("boy", boyimage);
	boy.scale = 0.1;

	//Create the Bodies Here.
	ground = new Ground(width / 2, height, width, 50);
	bodies.push(ground);

	tree = new Tree(600, 400);
	bodies.push(tree);

	stone = new Stone(150, 520);
	bodies.push(stone);

	launcher = new Launcher(stone.body, { x: 150, y: 510 });
	bodies.push(launcher);

	mango1 = new Mango(670, 140);
	bodies.push(mango1);

	mango2 = new Mango(575, 315);
	bodies.push(mango2);

	mango3 = new Mango(640, 190);
	bodies.push(mango3);

	mango4 = new Mango(570, 200);
	bodies.push(mango4);

	mango5 = new Mango(675, 270);
	bodies.push(mango5);

	mango6 = new Mango(485, 310);
	bodies.push(mango6);

	Engine.run(engine);
}


function draw() {
	rectMode(CENTER);
	background(255);

	drawSprites();

	for (let i = 0; i < bodies.length; i++) {
		bodies[i].display();
	}

	detectColission(stone, mango1);
	detectColission(stone, mango2);
	detectColission(stone, mango3);
	detectColission(stone, mango4);
	detectColission(stone, mango5);
	detectColission(stone, mango6);

}

function keyPressed() {
	if (key == ' ') {
		Body.setPosition(stone.body, { x: 150, y: 510 });
		launcher.attach(stone.body);
	}
}


function mouseDragged() {
	if (launcher.constraint.bodyA)
		Body.setPosition(stone.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
	launcher.fly();
}

function detectColission(stone, mango) {
	let distance = dist(stone.body.position.x, stone.body.position.y, mango.body.position.x, mango.body.position.y);
	console.log(stone.radius);
	if (distance <= stone.radius + mango.radius) {
		Body.setStatic(mango.body, false);
	}
}