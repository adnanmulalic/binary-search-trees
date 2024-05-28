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

        // remade recursive function according to tutorial video https://www.youtube.com/watch?v=VCTP81Ij-EM
        function travelDown(arr) {
            if (arr.length <= 0) {
                return null;
            }
            let middleIndex = Math.floor((arr.length - 1) / 2);
            console.log(arr)
            console.log(middleIndex)
            let midRoot = new Node(arr[middleIndex]);

            midRoot.left = travelDown(arr.slice(0, middleIndex));
            midRoot.right = travelDown(arr.slice(middleIndex + 1));

            return midRoot;
            
        }
        this.root = travelDown(cleanArray);
        console.log(this.root)
    }

    insert(value) {
        let currentNode = this.root;
        while (currentNode.left || currentNode.right) {
            value < currentNode.data ? currentNode = currentNode.left : currentNode = currentNode.right;
            console.log(currentNode)
        }
        value < currentNode.data ? currentNode.left = new Node(value) : currentNode.right = new Node(value);
    }

    deleteItem(value) {
        function smallestLeft(node) {
            if (node.left === null) {
                return node.right;
            }
            let midRoot = new Node(node.data);
            midRoot.right = node.right;
            midRoot.left = smallestLeft(node.left);
            return midRoot;
        }

        function findAndDelete(node) {
            if (value === node.data) {
                if (!node.left && !node.right) {
                    return null;
                } else if ((node.left && !node.right) || (!node.left && node.right)) {
                    node.left ? node = node.left : node = node.right;
                    return node;
                } else {
                    console.log("2 children nodes");
                    node.data = node.right.data;
                    node.right = smallestLeft(node.right);
                    return node;
                }
            }
            let midRoot = new Node(node.data);
            node.left ? midRoot.left = findAndDelete(node.left) : null;
            node.right ? midRoot.right = findAndDelete(node.right) : null;
            return midRoot;
        }
        this.root = findAndDelete(this.root);

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