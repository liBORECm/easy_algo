import { ReactElement, useEffect, useRef, useState } from "react"
import { Base } from "../common/Base"
import { findTreeNode, renderTree, Tree } from "../common/Tree"
import {
  bvs_delete,
  bvs_insert,
  bvs_is_correct,
  bvs_maximum,
  bvs_minimum,
  bvs_predecessor,
  bvs_search,
  bvs_succesor,
} from "./Bvs.impl"
import { Node, RenderNode } from "../common/Node"

export function BvsBase(): ReactElement {
  const tree = exampleTree()

  return (
    <Base<BVSTree, BVSNode>
      tree={tree}
      renderTree={renderBvsTree}
      is_correct={bvs_is_correct}
      search={bvs_search}
      insert={bvs_insert}
      delete={bvs_delete}
      maximum={bvs_maximum}
      minimum={bvs_minimum}
      succesor={bvs_succesor}
      predecessor={bvs_predecessor}
      findNode={findBVSNodeInTree}
    />
  )
}

export class BVSNode extends Node {
  override children: [BVSNode | undefined, BVSNode | undefined]

  constructor(value: number) {
    super(value)
    this.children = [undefined, undefined]
  }
}

export class BVSTree extends Tree {
  override root: BVSNode | undefined
}

export function findBVSNodeInTree(t: BVSTree, id: number): BVSNode | undefined {
  if (t.root === undefined) return undefined

  return findBVSNode(t.root, id)
}

function findBVSNode(node: BVSNode, id: number): BVSNode | undefined {
  if (node.id === id) return node

  for (const child of node.children) {
    if (child !== undefined) {
      const res = findBVSNode(child, id)
      if (res !== undefined) return res
    }
  }

  return undefined
}

export const exampleTree = (): BVSTree => {
  const tree = new BVSTree()

  // Root node
  tree.root = new BVSNode(10)

  // Left child of root
  const left = new BVSNode(5)
  tree.root.children[0] = left
  left.parent = tree.root

  // Right child of root
  const right = new BVSNode(15)
  tree.root.children[1] = right
  right.parent = tree.root

  const rightRight = new BVSNode(18)
  tree.root.children[1].children[1] = rightRight
  rightRight.parent = right

  // Left child of left
  const leftLeft = new BVSNode(3)
  left.children[0] = leftLeft
  leftLeft.parent = left

  // Right child of left
  const leftRight = new BVSNode(7)
  left.children[1] = leftRight
  leftRight.parent = left
  return tree
}

export function renderBvsTree(t: BVSTree): ReactElement {
  if (!t.root) return <div>Empty Tree</div>
  return (
    <div style={{ padding: "60px" }}>
      <TreeNode node={t.root} />
    </div>
  )
}

function TreeNode({ node }: { node: BVSNode }): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRef = useRef<HTMLDivElement>(null)

  const [crosses, setCrosses] = useState<{ x1: number; y1: number }[]>([])
  const [childrenLines, setChildrenLines] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([])
  const [parentLine, setParentLine] = useState<
    { x1: number; y1: number; x2: number; y2: number } | undefined
  >(undefined)

  useEffect(() => {
    if (!nodeRef.current || !containerRef.current) return

    const linesData: { x1: number; y1: number; x2: number; y2: number }[] = []
    const crosses: { x1: number; y1: number }[] = []

    const parentRect = nodeRef.current.getBoundingClientRect()

    node.children.forEach((child, i) => {
      if (!containerRef.current) return
      if (!child) {
        crosses.push({
          x1:
            parentRect.left +
            parentRect.width / 2 -
            containerRef.current.getBoundingClientRect().left + i*15 - 8,
          y1:
            parentRect.bottom -
            containerRef.current.getBoundingClientRect().top,
        })
        return
      }
      const childNode = document.getElementById(`node-${child.id}`)
      if (!childNode) return

      const childRect = childNode.getBoundingClientRect()

      linesData.push({
        x1:
          parentRect.left +
          parentRect.width / 2 -
          containerRef.current.getBoundingClientRect().left + i*15 - 8,
        y1:
          parentRect.bottom - containerRef.current.getBoundingClientRect().top,
        x2:
          childRect.left +
          childRect.width / 2 -
          containerRef.current.getBoundingClientRect().left,
        y2: childRect.top - containerRef.current.getBoundingClientRect().top,
      })
    })

    setChildrenLines(linesData)
    setCrosses(crosses)
  }, [node])

  useEffect(() => {
    if (!nodeRef.current || !containerRef.current) return

    if (!node.parent) return

    // const nodeRect = nodeRef.current.getBoundingClientRect()
    const parentNode = document.getElementById(`node-${node.parent.id}`)
    if (!parentNode) return

    const nodeRect = nodeRef.current.getBoundingClientRect()
    const parentRect = parentNode.getBoundingClientRect()

    const linesData = {
      x1: nodeRect.left + nodeRect.width / 2,
      y1: nodeRect.top,
      x2: parentRect.left + parentRect.width / 2,
      y2: parentRect.bottom,
    }

    setParentLine(linesData)
  }, [node])

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", textAlign: "center" }}
    >
      {/* from node to children */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M 0 3 L 5 5 L 0 7 z" fill="black" />
          </marker>
        </defs>
        {childrenLines.map((line, idx) => (
          <line
            key={idx}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="black"
            strokeWidth={2}
            markerEnd="url(#arrow)"
          />
        ))}
      </svg>
      <svg
        style={{
          position: "fixed", // místo absolute
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        <defs>
          <marker
            id="arrow2"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M 0 3 L 5 5 L 0 7 z" fill="red" />
          </marker>
        </defs>
        {parentLine && (
          <line
            key={`parentLine-${node.id}`}
            x1={parentLine.x1}
            y1={parentLine.y1}
            x2={parentLine.x2}
            y2={parentLine.y2}
            stroke="red"
            strokeWidth={2}
            markerEnd="url(#arrow2)"
          />
        )}
      </svg>

      {/* vykreslení crosses */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {crosses.map((cross, idx) => (
          <g key={idx}>
            <line
              x1={cross.x1 - 5}
              y1={cross.y1 - 5}
              x2={cross.x1 + 5}
              y2={cross.y1 + 5}
              stroke="gray"
              strokeWidth={2}
            />
            <line
              x1={cross.x1 + 5}
              y1={cross.y1 - 5}
              x2={cross.x1 - 5}
              y2={cross.y1 + 5}
              stroke="gray"
              strokeWidth={2}
            />
          </g>
        ))}
      </svg>

      {/* Samotný uzel */}
      <div
        id={`node-${node.id}`}
        ref={nodeRef}
        style={{
          display: "inline-block",
          marginBottom: "40px",
        }}
      >
        <RenderNode {...node} />
      </div>

      {/* Děti */}
      {node.children.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
          }}
        >
          {node.children.map(
            (child) => child && <TreeNode key={child.id} node={child} />
          )}
        </div>
      )}
    </div>
  )
}
