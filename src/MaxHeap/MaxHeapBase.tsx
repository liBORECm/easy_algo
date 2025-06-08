import { ReactElement } from "react"
import { BinaryHeap, findnodeInBinHeap, RenderBinaryHeap } from "../MinHeap/MinHeapBase"
import { max_heap_delete, max_heap_insert, max_heap_is_correct, max_heap_maximum, max_heap_minimum, max_heap_predecessor, max_heap_search, max_heap_succesor } from "./MaxHeap.impl"
import { Base } from "../common/Base"

export function MaxHeapBase(): ReactElement {
  const ex_heap = exampleMaxHeap()

  return (
    <Base<BinaryHeap, number>
      tree={ex_heap}
      renderTree={RenderBinaryHeap}
      is_correct={max_heap_is_correct}
      search={max_heap_search}
      insert={max_heap_insert}
      delete={max_heap_delete}
      maximum={max_heap_maximum}
      minimum={max_heap_minimum}
      succesor={max_heap_succesor}
      predecessor={max_heap_predecessor}
      findNode={findnodeInBinHeap}
    />
  )
}

export function exampleMaxHeap(): BinaryHeap {
  return new BinaryHeap([100, 50, 90, 20, 40, 80, 70, 10, 15])
}