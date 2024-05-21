class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(treeArray) {
        this.tree = treeArray;
        this.root = null;
    }

    buildTree(array = this.tree) {
        array.sort((a, b) => a - b);
        let cleanArray = [];
        array.forEach(element => {
            !cleanArray.includes(element) && cleanArray.push(element);
        });
        let middleIndex = Math.floor(cleanArray.length / 2);
        let leftSubArray = cleanArray.slice(0, middleIndex);
        let rightSubArray = cleanArray.slice(middleIndex + 1)
        this.root = new Node(cleanArray[middleIndex]);
        let leftSide = new Node(leftSubArray.splice([leftSubArray.length - 1], 1)[0])
        let rightSide = new Node(rightSubArray.splice([rightSubArray.length - 1], 1)[0])
        function travelDown(arr, branch) {
            if (arr.length <= 0) {
                return branch;
            }
            if (arr.length >= 2) {
                branch.right = new Node(arr[arr.length - 1]);
                branch.left = new Node(arr[arr.length - 2]);
                arr.splice(arr.length - 2)
                console.log("2nd part ran")
            } else if (arr.length === 1) {
                branch.left = new Node(arr[0]);
                arr.length = 0;
                console.log("3rd part ran")
            }
            travelDown(arr, branch.left)
        }
        travelDown(rightSubArray, rightSide);
        travelDown(leftSubArray, leftSide);
        this.root.left = leftSide;
        this.root.right = rightSide;
        console.log(leftSide)
        console.log(this.root)

        console.log(cleanArray, middleIndex);
        console.log(leftSubArray, rightSubArray)
    }

    
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
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
 

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
let diffTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);