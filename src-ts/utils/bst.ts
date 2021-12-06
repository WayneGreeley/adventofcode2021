class treeNode {
  value: number;
  left: treeNode | null;
  right: treeNode | null;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class bst {
  root: treeNode | null;

  constructor(root?: treeNode | null) {
    this.root = root || null;
  }

  insertEl(value: number): treeNode {
    if (this.root == null) {
      let root = new treeNode(value);
      this.root = root;
      return this.root;
    } else {
      return this.insert(this.root, value);
    }
  }

  insert(node: treeNode | null = this.root, value: number): treeNode {
    if (node == null) {
      const head = new treeNode(value);
      return head;
    } else {
      if (value > node.value) {
        node.right = this.insert(node.right, value);
      } else {
        node.left = this.insert(node.left, value);
      }
      return node;
    }
  }
}

let n = new treeNode(8);
console.log(n);

let bt = new bst(n);
bt.insert(bt.root, 10);
bt.insert(bt.root, 7);
bt.insert(bt.root, 9);
console.log(bt);
