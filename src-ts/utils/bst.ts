interface MyNode {
  value: number;
  left?: MyNode;
  right?: MyNode;
}

class bst {

    root: MyNode;

  constructor() {
      this.root = null;
  }

    insertValue(value: number){
        this.insert (this.root, value)
    }
    /**
    * Insert a value in the tree
    *
    * @param {MyNode} root - The root of the tree
    * @param {number} value - The value to insert
    * @returns {MyNode}
    */
    insert (root: MyNode, value: number): MyNode {
        if(root.value === undefined){
            root = { value: value, left: undefined, right: undefined }
        } else if (value > root.value) {
            if (root.right === undefined) {
              root.right = { value: value, left: undefined, right: undefined };
            } else {
              this.insert(root.right, value);
            }
        } else if (value < root.value) {
            if (root.left === undefined) {
              root.left = { value: value, left: undefined, right: undefined };
            } else {
              this.insert(root.left, value);
            }
        }
      return root;
    };
}
module.exports = bst;