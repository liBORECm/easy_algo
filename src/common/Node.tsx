import { Box } from "@mui/material"
import { ReactElement } from "react"

export class Node {
  private static nextId = 0

  public readonly id: number
  public value: number
  public parent: Node | undefined
  public children: Array<Node | undefined>
  public color: string | undefined

  public constructor(value: number) {
    this.value = value
    this.parent = undefined
    this.children = []
    this.id = Node.nextId++
  }
}

export function RenderNode(n: Node): ReactElement {
  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: 99999,
        border: `2px solid ${n.color ?? "black"}`,
        display: "flex",
        flexDirection: "column",
        background: "white",
        minWidth: "60px",
        alignItems: "center",
      }}
    >
      <Box>{`id: ${n.id}`}</Box>
      <Box>{`val: ${n.value}`}</Box>
    </Box>
  );
}
