import { ReactElement } from "react"
import { Base } from "../common/Base"
import { Node } from "../common/Node"
import {
  rb_delete,
  rb_insert,
  rb_is_correct,
  rb_maximum,
  rb_minimum,
  rb_predecessor,
  rb_rotate_left,
  rb_rotate_right,
  rb_search,
  rb_succesor,
} from "./RB.impl"
import { Tree } from "../common/Tree"
import { renderBvsTree } from "../BVS/BvsBase"

export function RBBase(): ReactElement {
  const tree = exampleTree()

  return (
    <Base<RBTree, RBNode>
      tree={tree}
      renderTree={renderBvsTree}
      is_correct={rb_is_correct}
      search={rb_search}
      insert={rb_insert}
      delete={rb_delete}
      maximum={rb_maximum}
      minimum={rb_minimum}
      succesor={rb_succesor}
      predecessor={rb_predecessor}
      findNode={findRBNodeInTree}
      otherFunctions={{node: [{fn: rb_rotate_left, name: "roate left"}, {fn: rb_rotate_right, name: "roate right"}]}}
    />
  )
}

export class RBTree extends Tree {
  override root: RBNode | undefined
}

export class RBNode extends Node {
  override children: [RBNode | NullNode, RBNode | NullNode]

  public constructor(value: number, color: "red" | "black") {
    super(value)
    this.children = [new NullNode(), new NullNode()]
    this.color = color
  }
}

export class NullNode extends Node {
  override children: [undefined, undefined]
  constructor() {
    super(-1)
    this.color = "black"
    this.children = [undefined, undefined]
  }
}

function exampleTree(): RBTree {
  const tree = new RBTree()

  const root = new RBNode(10, "black")
  const left = new RBNode(5, "red")
  const right = new RBNode(20, "red")

  // vazby
  root.children = [left, right]
  left.parent = root
  right.parent = root

  tree.root = root
  const n2 = new RBNode(2, "black")
  const n7 = new RBNode(7, "black")
  const n15 = new RBNode(15, "black")

  left.children = [n2, n7]
  n2.parent = left
  n7.parent = left

  right.children[0] = n15
  n15.parent = right

  return tree
}

function findRBNodeInTree(t: RBTree, id: number): RBNode | undefined {
  if (t.root === undefined) return undefined

  return findRBNode(t.root, id)
}

function findRBNode(node: RBNode, id: number): RBNode | undefined {
  if (node.id === id) return node

  for (const child of node.children) {
    if (child instanceof RBNode) {
      const res = findRBNode(child, id)
      if (res !== undefined) return res
    }
  }

  return undefined
}
