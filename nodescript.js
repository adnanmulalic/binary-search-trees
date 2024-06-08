import Tree from "./binarysearchtrees.js";

const prettyPrint = (node, prefix = "", isLeft = true) => { // function provided by The Odin Project to display tree in console
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

function randomNumbers(quantity, min, max) { // generate random numbers
    let arr = [];
    while (arr.length < quantity) {
        arr.push(Math.floor(Math.random() * (max - min) + min)) // as per MDN Math.random
    }
    return arr;
}

const tree = new Tree(randomNumbers(20, 1, 100)); // create new binary tree, remove duplicates, sort array, create nodes
tree.isBalanced(); // check if tree is balanced
prettyPrint(tree.root);
console.log("Is tree balanced: " + tree.isBalanced());
console.log("Level order: " + tree.levelOrder());
console.log("Pre order: " + tree.preOrder());
console.log("Post order: " + tree.postOrder());
console.log("In order: " + tree.inOrder());

let newNumbers = randomNumbers(20 , 100, 200); // create new array with numbers
console.log("Add new numbers: " + newNumbers);
newNumbers.forEach((number) => tree.insert(number)); // insert new numbers
prettyPrint(tree.root);
console.log("Is tree balanced: " + tree.isBalanced());
tree.rebalance();
console.log("Rebalancing tree...");
console.log("Is tree balanced: " + tree.isBalanced());
console.log("Level order: " + tree.levelOrder());
console.log("Pre order: " + tree.preOrder());
console.log("Post order: " + tree.postOrder());
console.log("In order: " + tree.inOrder());
prettyPrint(tree.root);


