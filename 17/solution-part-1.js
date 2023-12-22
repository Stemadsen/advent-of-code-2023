import { readInputFileAsLines } from '../utils/file-utils.js';
import * as assert from 'assert';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import { range } from '../utils/array-utils.js';

const testInput = readInputFileAsLines('test-input.txt');
assert.equal(solve(testInput), 102, 'Test input solution is not correct!');

const input = readInputFileAsLines();
console.log(solve(input));

function solve(grid) {
  const height = grid.length;
  const width = grid[0].length;
  const graph = buildGraph(grid, height, width);
  return dijkstra(graph, '0,0', `${width - 1},${height - 1}`);
}

function buildGraph(grid, height, width) {
  const graph = new Map();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const node = `${x},${y}`;
      graph[node] = new Map();
      if (x + 1 < width) graph[node].set(`${x + 1},${y}`, Number(grid[y][x + 1]));
      if (y + 1 < height) graph[node].set(`${x},${y + 1}`, Number(grid[y + 1][x]));
      if (x - 1 >= 0) graph[node].set(`${x - 1},${y}`, Number(grid[y][x - 1]));
      if (y - 1 >= 0) graph[node].set(`${x},${y - 1}`, Number(grid[y - 1][x]));
    }
  }
  return graph;
}

function dijkstra(graph, startNode, endNode) {
  const distances = new Map();
  const alreadyVisited = new Set();
  const queue = new MinPriorityQueue(node => node.distance);
  queue.enqueue({node: startNode, previousNodes: [], distance: 0});
  distances.set(stringifyNode({node: startNode, previousNodes: []}), 0);

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    const currentNode = current.node;
    const currentPathJson = stringifyNode(current);
    if (alreadyVisited.has(currentPathJson)) {
      console.log(`Already tried: ${currentPathJson}`);
      continue;
    }
    if (isIllegal(current)) {
      console.log(`Illegal node: ${currentPathJson}`);
      distances.set(currentPathJson, Infinity);
      alreadyVisited.add(currentPathJson);
      continue;
    }
    alreadyVisited.add(currentPathJson);
    if (currentNode === endNode) {
      console.log(`Found solution ${currentPathJson} with distance ${distances.get(currentPathJson)}`);
      return distances.get(currentPathJson);
    }
    const neighbors = graph[currentNode];
    const newPreviousNodes = current.previousNodes.concat(currentNode);
    for (const neighborNode of neighbors.keys()) {
      const neighborPathJson = stringifyNode({node: neighborNode, previousNodes: newPreviousNodes});
      const distance = distances.get(currentPathJson) + neighbors.get(neighborNode);
      if (distances.has(neighborPathJson) && distance >= distances.get(neighborPathJson)) continue;
      distances.set(neighborPathJson, distance);
      queue.enqueue({node: neighborNode, previousNodes: newPreviousNodes, distance});
    }
  }
}

function isIllegal(current) {
  const coords = current.node.split(',');
  const x = Number(coords[0]);
  const y = Number(coords[1]);
  const previousNodes = current.previousNodes;
  const numVisited = previousNodes.length;
  return isAUTurn(x, y, previousNodes, numVisited) || isAStraightLine(x, y, previousNodes, numVisited);
}

function isAUTurn(x, y, previousNodes, numVisited) {
  return numVisited >= 2 && previousNodes[numVisited - 2] === `${x},${y}`;
}

function isAStraightLine(x, y, previousNodes, numVisited) {
  return isAStraightLineGoingRight(x, y, previousNodes, numVisited)
      || isAStraightLineGoingDown(x, y, previousNodes, numVisited)
      || isAStraightLineGoingLeft(x, y, previousNodes, numVisited)
      || isAStraightLineGoingUp(x, y, previousNodes, numVisited);
}

function isAStraightLineGoingRight(x, y, previousNodes, numVisited) {
  for (const i of range(3, 1)) {
    if (numVisited - i < 0 || previousNodes[numVisited - i] !== `${x - i},${y}`) return false;
  }
  return true;
}

function isAStraightLineGoingDown(x, y, previousNodes, numVisited) {
  for (const i of range(3, 1)) {
    if (numVisited - i < 0 || previousNodes[numVisited - i] !== `${x},${y - i}`) return false;
  }
  return true;
}

function isAStraightLineGoingLeft(x, y, previousNodes, numVisited) {
  for (const i of range(3, 1)) {
    if (numVisited - i < 0 || previousNodes[numVisited - i] !== `${x + i},${y}`) return false;
  }
  return true;
}

function isAStraightLineGoingUp(x, y, previousNodes, numVisited) {
  for (const i of range(3, 1)) {
    if (numVisited - i < 0 || previousNodes[numVisited - i] !== `${x},${y + i}`) return false;
  }
  return true;
}

function stringifyNode(node) {
  return JSON.stringify({node: node.node, previousNodes: node.previousNodes});
}
