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
            if (currentNode.left && value < currentNode.data) {
                currentNode = currentNode.left;
                console.log(currentNode);
            } else if (currentNode.right && value > currentNode.data) {
                currentNode = currentNode.right;
                console.log(currentNode);
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
                    console.log("2 children nodes");
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

        if (callback !== false) {
            console.log(arrayOfValues, "console");
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

        if (callback !== false) {
            console.log(arrayOfValues, "console");
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

        if (callback !== false) {
            console.log(arrayOfValues, "console");
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

        if (callback !== false) {
            console.log(arrayOfValues, "console");
            return arrayOfValues;
        } 
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
let diffTree = new Tree([1, 2, 3, 4, 5, 6]);