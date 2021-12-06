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

  insert(value: number): treeNode {
    if (this.root == null) {
      let root = new treeNode(value);
      this.root = root;
      return this.root;
    } else {
      return this.insertTree(this.root, value);
    }
  }

  insertTree(node: treeNode | null = this.root, value: number): treeNode {
    if (node == null) {
      const head = new treeNode(value);
      return head;
    } else {
      if (value > node.value) {
        node.right = this.insertTree(node.right, value);
      } else {
        node.left = this.insertTree(node.left, value);
      }
      return node;
    }
  }

  traverse(): void {
    if (this.root != null) {
      this.traverseTree(this.root);
    }
  }

  traverseTree(node: treeNode | null = this.root): void {
    let temp = node;
    if (temp !== null) {
      this.traverseTree(node.left);
      console.log(temp.value);
      this.traverseTree(node.right);
    }
  }

  //null means not found
  search(value: number): treeNode {
    if (this.root != null) {
      return this.searchTree(this.root, value);
    } else {
      return null;
    }
  }

  searchTree(node: treeNode | null = this.root, value: number): treeNode {
    let temp = node;
    if (temp === null) {
      return null;
    } else if (temp.value === value) {
      return temp;
    } else {
      if (value > temp.value) {
        return this.searchTree(temp.right, value);
      } else {
        return this.searchTree(temp.left, value);
      }
    }
  }
}

let n = new treeNode(8);
console.log(n);

let bt = new bst(n);
bt.insertTree(bt.root, 10);
bt.insertTree(bt.root, 7);
bt.insertTree(bt.root, 9);
console.log(bt);

console.log("--------------");

let ebt = new bst();
console.log(ebt);
ebt.insert(99);
ebt.insert(101);
ebt.insert(100);
console.log(ebt);
console.log("--------------");
ebt.traverse();
console.log("--------------");
console.log(ebt.search(88));
console.log(ebt.search(100));
