import { ReactElement, useEffect, useRef, useState } from "react"
import { Node, RenderNode } from "./Node"

export class Tree {
  public root: Node | undefined
}

export function renderTree(t: Tree): React.ReactElement {
  if (!t.root) return <div>Empty Tree</div>
  return (
    <div style={{ padding: "60px" }}>
      <TreeNode node={t.root} />
    </div>
  )
}

interface TreeNodeProps {
  node: Node
}

function TreeNode({ node }: TreeNodeProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRef = useRef<HTMLDivElement>(null)
  const [childrenLines, setChildrenLines] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([])
  const [parentLine, setParentLine] = useState<
    { x1: number; y1: number; x2: number; y2: number } | undefined
  >(undefined)

  useEffect(() => {
    if (!nodeRef.current || !containerRef.current) return

    const linesData: { x1: number; y1: number; x2: number; y2: number }[] = []

    const parentRect = nodeRef.current.getBoundingClientRect()

    node.children.forEach((child) => {
      if (!child) return
      const childNode = document.getElementById(`node-${child.id}`)
      if (!childNode) return

      const childRect = childNode.getBoundingClientRect()

      if (containerRef.current) {
        linesData.push({
          x1:
            parentRect.left +
            parentRect.width / 2 -
            containerRef.current.getBoundingClientRect().left,
          y1:
            parentRect.bottom -
            containerRef.current.getBoundingClientRect().top,
          x2:
            childRect.left +
            childRect.width / 2 -
            containerRef.current.getBoundingClientRect().left,
          y2: childRect.top - containerRef.current.getBoundingClientRect().top,
        })
      }
    })

    setChildrenLines(linesData)
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
  y2: parentRect.bottom
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

export function findTreeNode(t: Tree, id: number): Node | undefined {
  if (t.root === undefined) return undefined

  return findNode(t.root, id)
}

function findNode(node: Node, id: number): Node | undefined {
  if (node.id === id) return node

  for (const child of node.children) {
    if (child !== undefined) {
      const res = findNode(child, id)
      if (res !== undefined) return res
    }
  }

  return undefined
}
