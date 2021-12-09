class graph {
  nodes: Map<string, Set<string>>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(node: string) {
    this.nodes.set(node, new Set());
  }

  addEdge(src: string, dest: string) {
    //both nodes need to exist
    if (this.nodes.has(src) && this.nodes.has(dest)) {
      this.nodes.get(src).add(dest);
      this.nodes.get(dest).add(src);
    }
  }

  find(x: string): string {
    let found = "-1";
    this.nodes.forEach((value, z) => {
      //console.log(`find: ${z}|${x}`);
      //z is node, value is edges
      if (z == x) {
        found = z;
      }
    });
    return found;
  }

  bfs(src: string, dest: string): boolean {
    let queue = [src];
    let visited: Array<string> = [];

    while (queue.length) {
      let current = queue.shift();
      //console.log(`  curr: ${current}`);
      if (visited.includes(current)) {
        continue;
      }
      if (current === dest) {
        return true;
      }
      visited.push(current);
      //add edge neighbors to queue
      this.nodes.get(current).forEach((x) => {
        queue.push(x);
      });
    }
    return false;
  }

  bfsCount(src: string): number {
    let queue = [src];
    let visited: Array<string> = [];
    let count = 0;

    while (queue.length) {
      let current = queue.shift();
      //console.log(`  curr: ${current}`);
      if (visited.includes(current)) {
        continue;
      } else {
        count++;
      }
      visited.push(current);
      //add edge neighbors to queue
      this.nodes.get(current).forEach((x) => {
        queue.push(x);
      });
    }
    return count;
  }

  dfs(src: string, dest: string, visited: Array<string> = []): boolean {
    if (visited.includes(src)) {
      return false;
    }
    if (src === dest) {
      return true;
    }
    visited.push(src);

    //let neighbors = this.nodes.get(src)
    this.nodes.get(src).forEach((x) => {
      if (this.dfs(x, dest, visited)) {
        return true;
      }
    });

    return false;
  }
}

let g = new graph();
g.addNode("wayne");
g.addNode("mike");
g.addNode("jason");
g.addNode("jenny");
g.addNode("tom");
g.addNode("solo");
g.addNode("lizzard");
g.addNode("wizzard");
g.addEdge("lizzard", "wizzard");
g.addEdge("jason", "tom");
g.addEdge("wayne", "mike");
g.addEdge("wayne", "jason");
g.addEdge("wayne", "tom");
g.addEdge("jenny", "jason");
console.log(g);
console.log(g.bfs("wayne", "lizzard"));
console.log(g.bfs("wayne", "jenny"));
console.log("-------");
console.log(g.bfsCount("wayne"));
console.log(g.bfsCount("lizzard"));
console.log(g.bfsCount("solo"));
console.log("-------");
console.log(g.find("hans"));
console.log(g.find("solo"));
console.log("-------");
console.log(g.dfs("wayne", "lizzard"));
console.log(g.dfs("wayne", "jenny")); // <-fail, pick this up some other time.
