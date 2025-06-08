import { ReactElement, useLayoutEffect, useRef, useState } from "react"
import { Base } from "../common/Base"
import {
  min_heap_delete,
  min_heap_insert,
  min_heap_is_correct,
  min_heap_maximum,
  min_heap_minimum,
  min_heap_predecessor,
  min_heap_search,
  min_heap_succesor,
} from "./MinHeap.impl"
import { Box } from "@mui/material"

export function MinHeapBase(): ReactElement {
  const ex_heap = exampleMinHeap()

  return (
    <Base<BinaryHeap, number>
      tree={ex_heap}
      renderTree={RenderBinaryHeap}
      is_correct={min_heap_is_correct}
      search={min_heap_search}
      insert={min_heap_insert}
      delete={min_heap_delete}
      maximum={min_heap_maximum}
      minimum={min_heap_minimum}
      succesor={min_heap_succesor}
      predecessor={min_heap_predecessor}
      findNode={findnodeInBinHeap}
    />
  )
}

export function exampleMinHeap(): BinaryHeap {
  const heap = new BinaryHeap([1, 3, 6, 5, 9, 8, 7, 10, 12, 15])
  return heap
}

export function findnodeInBinHeap(
  tree: BinaryHeap,
  id: number
): number | undefined {
  tree.nodes.forEach((n) => {
    if (n === id) return id
  })
  return undefined
}

export class BinaryHeap {
  public nodes: Array<number>

  public constructor(nodes?: Array<number>) {
    this.nodes = nodes || []
  }
}

type HeapNodeProps = {
  heap: BinaryHeap
  index: number
}

type Line = { fromId: number; toId: number }

function HeapNode({ heap, index }: HeapNodeProps): ReactElement {
  const leftIndex = 2 * index + 1
  const rightIndex = 2 * index + 2

  const hasLeft = leftIndex < heap.nodes.length
  const hasRight = rightIndex < heap.nodes.length

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <div
        id={`heap-node-${index}`}
        style={{
          display: "inline-block",
          marginBottom: "40px",
        }}
      >
        <div
                id={`node-${index}`}
                style={{
                  display: "inline-block",
                  marginBottom: "40px",
                }}
              >
                <RenderBinHeapNode index={index} val={heap.nodes[index]} />
              </div>
      </div>

      {(hasLeft || hasRight) && (
        <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          {hasLeft && <HeapNode heap={heap} index={leftIndex} />}
          {hasRight && <HeapNode heap={heap} index={rightIndex} />}
        </div>
      )}
    </div>
  )
}

export function RenderBinHeapNode(props: {index: number, val: number}) {
  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: 99999,
        border: `2px solid black`,
        display: "flex",
        flexDirection: "column",
        background: "white",
        minWidth: "60px",
        alignItems: "center",
      }}
    >
      <Box>{`id: ${props.index}`}</Box>
      <Box>{`val: ${props.val}`}</Box>
    </Box>
  );
}

export function RenderBinaryHeap(heap: BinaryHeap): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lines, setLines] = useState<Line[]>([])

  useLayoutEffect(() => {
    const newLines: Line[] = []
    const n = heap.nodes.length

    for (let i = 0; i < n; i++) {
      const left = 2 * i + 1
      const right = 2 * i + 2
      if (left < n) newLines.push({ fromId: i, toId: left })
      if (right < n) newLines.push({ fromId: i, toId: right })
    }

    setLines(newLines)
  }, [heap.nodes])

  return (
    <div
      ref={containerRef}
      style={{ padding: "60px", position: "relative" }}
      id="heap-container"
    >
      {/* SVG lines */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {lines.map((line, idx) => {
          const fromEl = document.getElementById(`heap-node-${line.fromId}`)
          const toEl = document.getElementById(`heap-node-${line.toId}`)
          if (!fromEl || !toEl) return null

          const fromRect = fromEl.getBoundingClientRect()
          const toRect = toEl.getBoundingClientRect()

          const containerRect =
            containerRef.current?.getBoundingClientRect() ??
            new DOMRect(0, 0, 0, 0)

          return (
            <line
              key={idx}
              x1={fromRect.left + fromRect.width / 2 - containerRect.left}
              y1={fromRect.bottom - containerRect.top - 40}
              x2={toRect.left + toRect.width / 2 - containerRect.left}
              y2={toRect.top - containerRect.top}
              stroke="black"
              strokeWidth={2}
            />
          )
        })}
      </svg>

      {/* Strom */}
      {heap.nodes.length === 0 ? (
        <div>Empty Heap</div>
      ) : (
        <HeapNode heap={heap} index={0} />
      )}
    </div>
  )
}

