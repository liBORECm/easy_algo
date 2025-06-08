import { ReactElement, useState } from "react"
import Box from "@mui/material/Box"
import { Button, TextField } from "@mui/material"

export function Base<T, N>(props: {
  tree: T
  renderTree: (tree: T) => ReactElement
  is_correct: (tree: T) => boolean
  search?: (tree: T, Value: number) => N | undefined
  insert?: (tree: T, Value: number) => boolean
  delete?: (tree: T, node: N) => boolean
  maximum?: (tree: T) => N | undefined
  minimum?: (tree: T) => N | undefined
  succesor?: (tree: T, node: N) => N | undefined
  predecessor?: (tree: T, node: N) => N | undefined
  findNode: (tree: T, id: number) => N | undefined
  otherFunctions?: {
    none?: Array<{
      fn: (tree: T) => any
      name: string
    }>
    node?: Array<{
      fn: (tree: T, node: N) => any
      name: string
    }>
    val?: Array<{
      fn: (tree: T, value: number) => any
      name: string
    }>
  }
}): ReactElement {
  const [inputValue, setValue] = useState<number>(0)
  const [inputId, setId] = useState<number>(0)
  const [render_num, rerender] = useState<number>(1)

  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Box width="15vw">
        <Box sx={{ margin: "50px", display: "flex", flexDirection: "column" }}>
          <>
            Node id:{" "}
            <TextField
              onChange={(event) => setId(Number(event.target.value))}
              value={inputId}
            ></TextField>
          </>
          <>
            Node Value:{" "}
            <TextField
              onChange={(event) => setValue(Number(event.target.value))}
              value={inputValue}
            ></TextField>
          </>
        </Box>

        <Box sx={{ margin: "50px", display: "flex", flexDirection: "column" }}>
          <Button
            onClick={() => {
              if (!props.search) return
              console.log(props.search(props.tree, inputValue))
              rerender(render_num + 1)
            }}
          >
            search {props.search === undefined && "X"}
          </Button>
          <Button
            onClick={() => {
              if (!props.insert) return
              console.log(props.insert(props.tree, inputValue))
              rerender(render_num + 1)
            }}
          >
            insert {props.insert === undefined && "X"}
          </Button>
          <Button
            onClick={() => {
              if (!props.delete) return
              const n = props.findNode(props.tree, inputId)
              if (n !== undefined) console.log(props.delete(props.tree, n))
              else console.log("node not in tree")
              rerender(render_num + 1)
            }}
          >
            delete {props.delete === undefined && "X"}
          </Button>
          <Button
            onClick={() => {
              if (!props.maximum) return
              console.log(props.maximum(props.tree))
              rerender(render_num + 1)
            }}
          >
            maximum {props.maximum === undefined && "X"}
          </Button>
          <Button
            onClick={() => {
              if (!props.minimum) return
              console.log(props.minimum(props.tree))
              rerender(render_num + 1)
            }}
          >
            minimum {props.minimum === undefined && "X"}
          </Button>
          <Button
            onClick={() => {
              if (!props.succesor) return
              const n = props.findNode(props.tree, inputId)
              if (n !== undefined) console.log(props.succesor(props.tree, n))
              else console.log("node not in tree")
              rerender(render_num + 1)
            }}
          >
            succesor {props.succesor === undefined && "X"}
          </Button>
          <Button
            onClick={() => {
              if (!props.predecessor) return
              const n = props.findNode(props.tree, inputId)
              if (n !== undefined) console.log(props.predecessor(props.tree, n))
              else console.log("node not in tree")
              rerender(render_num + 1)
            }}
          >
            predecessor {props.predecessor === undefined && "X"}
          </Button>
          {props.otherFunctions &&
            props.otherFunctions.none &&
            props.otherFunctions.none.map(({ fn, name }) => (
              <Button
                onClick={() => {
                  console.log(fn(props.tree))
                  rerender(render_num + 1)
                }}
              >
                {name}
              </Button>
            ))}
          {props.otherFunctions &&
            props.otherFunctions.node &&
            props.otherFunctions.node.map(({ fn, name }) => (
              <Button
                onClick={() => {
                  const node = props.findNode(props.tree, inputId)
                  if (!node) console.log("node not in tree")
                  else console.log(fn(props.tree, node))
                  rerender(render_num + 1)
                }}
              >
                {name}
              </Button>
            ))}
          {props.otherFunctions &&
            props.otherFunctions.val &&
            props.otherFunctions.val.map(({ fn, name }) => (
              <Button
                onClick={() => {
                  console.log(fn(props.tree, inputValue))
                  rerender(render_num + 1)
                }}
              >
                {name}
              </Button>
            ))}
        </Box>
      </Box>

      <Box>{props.renderTree(props.tree)}</Box>
    </Box>
  )
}
