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
            let midRoot = new Node(arr[middleIndex]);
            midRoot.left = travelDown(arr.slice(0, middleIndex));
            midRoot.right = travelDown(arr.slice(middleIndex + 1));
            return midRoot;
            
        }
        this.root = travelDown(cleanArray);
    }

    insert(value) {
        let currentNode = this.root;
        while (currentNode.left || currentNode.right) {
            if (currentNode.left && value < currentNode.data) {
                currentNode = currentNode.left;
            } else if (currentNode.right && value > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                break;
            }
        }

        value < currentNode.data ? currentNode.left = new Node(value) : currentNode.right = new Node(value);
    }

    deleteItem(value) {
        function deleteSmallestLeft(node) { // build new tree without node with deleted value
            if (node.left === null) {
                return node.right;
            }
            let midRoot = new Node(node.data);
            midRoot.right = node.right;
            midRoot.left = deleteSmallestLeft(node.left);
            return midRoot;
        }

        function findSmallestLeft(node) { // find node with next value (last node with no left subtree)
            if (node.left === null) {
                return node.data;
            }
            return findSmallestLeft(node.left);
        }

        function findAndDelete(node) {
            if (value === node.data) {
                if (!node.left && !node.right) {
                    return null;
                } else if ((node.left && !node.right) || (!node.left && node.right)) {
                    node.left ? node = node.left : node = node.right;
                    return node;
                } else {
                    node.data = findSmallestLeft(node.right);
                    node.right = deleteSmallestLeft(node.right);
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

    find(value) {
        function findNode(node) {
            if (node && node.data === value) {
                return node;
            } else if (node) {
                return value < node.data ? findNode(node.left) : findNode(node.right);
            } else {
                return "Node not found";
            }
        }
        return findNode(this.root);
    }

    printData(node) { // callback testing function
        console.log(node.data, "This is callback")
        //return node.data + "This is callback";
    }

    levelOrder(callback = false) {
        let arrayOfValues = [];
/*         let arrayOfNodes = [this.root]; // iterative 
        while (arrayOfNodes.length !== 0) {
            let currentNode = arrayOfNodes[0];
            (currentNode && callback) && callback(currentNode);
            currentNode && arrayOfValues.push(currentNode.data);
            currentNode && arrayOfNodes.push(currentNode.left, currentNode.right);
            arrayOfNodes.shift();
        }
*/        

        function travelDown(node, arrOfNodes = []) { // recursive
            if (!node) {
                return;
            }
            callback && callback(node);
            arrOfNodes.shift();
            arrayOfValues.push(node.data);
            node.left && arrOfNodes.push(node.left);
            node.right && arrOfNodes.push(node.right);
            travelDown(arrOfNodes[0], arrOfNodes);
            return;
        }
        travelDown(this.root);

        if (callback === false) {
            return arrayOfValues;
        } 
    }

    inOrder(callback = false) {
        let arrayOfValues = [];
        
        function travelDown(node) {
            if (!node) {
                return;
            }
            travelDown(node.left);
            callback && callback(node);
            arrayOfValues.push(node.data); // same as preOrder, except when node.data is pushed in array(before traversing right subtree)
            travelDown(node.right);
            return;
        }

        travelDown(this.root);

        if (callback === false) {
            return arrayOfValues;
        } 
    }
    
    preOrder(callback = false) {
        let arrayOfValues = [];

        function travelDown(node) { // modified recursive from leverOrder
            if (!node) {
                return;
            }
            callback && callback(node);
            arrayOfValues.push(node.data);
            travelDown(node.left);
            travelDown(node.right);
            return;
        }
        travelDown(this.root);

        if (callback === false) {
            return arrayOfValues;
        } 
    }

    postOrder(callback = false) {
        let arrayOfValues = [];

        function travelDown(node) { // similiar to other, except node.data is pushed at the end (when we reach nodes with subtrees)
            if (!node) {
                return;
            }
            travelDown(node.left);
            travelDown(node.right);
            callback && callback(node);
            arrayOfValues.push(node.data);
            return;
        }
        travelDown(this.root);

        if (callback === false) {
            return arrayOfValues;
        } 
    }

    height(value) {
        let heightOfNode = null;
        function heightOfTree(node) { // as per this video https://www.youtube.com/watch?v=AWIJwNf0ZQE
            if (!node) {
                return -1;
            }
            let leftSide = heightOfTree(node.left);
            let rightSide = heightOfTree(node.right);
            let maxHeight = leftSide > rightSide ? leftSide + 1 : rightSide + 1;
            if (node.data === value) {
                heightOfNode = maxHeight;
            }
            return maxHeight;
        }

        if (this.root.data === value) {
            return 0;
        } else {
            heightOfTree(this.root);
            return heightOfNode ? heightOfNode : "No node with this value";
        }
    }

    depth(value) {
        function findNode(node, edges = 0) {
            if (node.data === value) {
                return edges;
            }
            return value < node.data ? node.left && findNode(node.left, edges + 1) : node.right && findNode(node.right, edges + 1);
        }

        if (this.root.data === value) {
            return 0;
        } else {
            return findNode(this.root) ? findNode(this.root) : "No node with this value";
        }
    }

    isBalanced() {
        let isBalanced = true;
        function heightOfTree(node) { 
            if (!node) {
                return -1;
            }
            let leftSide = heightOfTree(node.left);
            let rightSide = heightOfTree(node.right);
            let maxHeight = leftSide > rightSide ? leftSide + 1 : rightSide + 1;
            console.log(leftSide - rightSide)
            if (leftSide - rightSide > 1 || leftSide - rightSide < - 1) { // if left tree - right is greater then 1 or less then -1, then tree is not balanced
                isBalanced = false;
            }
            return maxHeight;
        }
        heightOfTree(this.root);
        return isBalanced;
    }

    rebalance() {
        this.buildTree(this.levelOrder());
    }
}

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
 

let tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
let smallTree = new Tree([1, 2, 3, 4, 5]);