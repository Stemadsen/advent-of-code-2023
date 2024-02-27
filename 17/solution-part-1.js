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

// TODO: Currently chooses path from 11,7 to 10,7 (d = 77) instead of 12,7 (d = 74)
// Probably due to wrong path taken to 12,8:
// ["0,0","1,0","2,0","2,1","3,1","4,1","5,1","5,0","6,0","7,0","8,0","8,1","8,2","9,2","10,2","10,3","10,4","11,4","11,5","12,5","12,6","12,7","12,8"]
function dijkstra(graph, startNode, endNode) {
  const distances = new Map();
  const alreadyVisited = new Set();
  const queue = new MinPriorityQueue(node => node.distance);
  queue.enqueue({node: startNode, previousNodes: [], distance: 0});
  distances.set(startNode, 0);

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    const currentNode = current.node;
    const currentPathJson = stringifyNode(current);
    if (alreadyVisited.has(currentNode)) {
      console.log(`Already tried: ${currentNode}`);
      continue;
    }
    alreadyVisited.add(currentNode);
    if (currentNode === endNode) {
      console.log(`\nFound solution ${currentPathJson} with distance ${distances.get(currentNode)}`);
      return distances.get(currentNode);
    }
    const neighbors = graph[currentNode];
    const newNodeSequence = current.previousNodes.concat(currentNode);
    for (const neighborNode of neighbors.keys()) {
      if (isIllegalSequence(newNodeSequence)) {
        console.log(`Illegal sequence, skipping: ${currentPathJson}`);
        // distances.set(currentPathJson, Infinity);
        // alreadyVisited.add(currentPathJson);
        continue;
      }
      const distance = distances.get(currentNode) + neighbors.get(neighborNode);
      if (distances.has(neighborNode) && distance >= distances.get(neighborNode)) continue;
      distances.set(neighborNode, distance);
      queue.enqueue({node: neighborNode, previousNodes: newNodeSequence, distance});
    }
  }
}

function isIllegalSequence(moves) {
  if (moves.length < 2) return false;
  const lastMove = moves[moves.length - 1].split(',').map(Number);
  const numVisited = moves.length - 1;
  const previousNodes = moves.slice(0, numVisited);
  return isAUTurn(lastMove[0], lastMove[1], previousNodes, numVisited)
      || isAStraightLine(lastMove[0], lastMove[1], previousNodes, numVisited);
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
  for (const i of range(4, 1)) {
    if (numVisited - i < 0 || previousNodes[numVisited - i] !== `${x - i},${y}`) return false;
  }
  return true;
}

function isAStraightLineGoingDown(x, y, previousNodes, numVisited) {
  for (const i of range(4, 1)) {
    if (numVisited - i < 0 || previousNodes[numVisited - i] !== `${x},${y - i}`) return false;
  }
  return true;
}

function isAStraightLineGoingLeft(x, y, previousNodes, numVisited) {
  for (const i of range(4, 1)) {
    if (numVisited - i < 0 || previousNodes[numVisited - i] !== `${x + i},${y}`) return false;
  }
  return true;
}

function isAStraightLineGoingUp(x, y, previousNodes, numVisited) {
  for (const i of range(4, 1)) {
    if (numVisited - i < 0 || previousNodes[numVisited - i] !== `${x},${y + i}`) return false;
  }
  return true;
}

function stringifyNode(node) {
  return JSON.stringify({node: node.node, previousNodes: node.previousNodes});
}
