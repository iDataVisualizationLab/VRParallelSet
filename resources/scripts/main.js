var container, camera, scene, renderer, controls, group;
init();

// Read Input

// Grid

var LEN = 100;
var grid = new Grid([4,2,5,3], LEN);

// Stacks

var stack0 = new Stack(grid.markerLocation(0,0),grid.markerLocation(1,1),[60], LEN);
var stack1 = new Stack(grid.markerLocation(1,1),grid.markerLocation(2,2),[30,30], LEN);
var stack2 = new Stack(grid.markerLocation(2,0),grid.markerLocation(3,2),[20,20,20], LEN);

// Animate

animate();