import { ReactElement, useState } from "react";
import Box from '@mui/material/Box';
import { Button, TextField } from "@mui/material";

export function Base<T, N> (props: {
  tree: T
  renderTree: (tree: T) => ReactElement,
  is_correct: (tree: T) => boolean,
  search: (tree: T, Value: number) => N | undefined,
  insert: (tree: T, Value: number) => boolean
  delete: (tree: T, node: N) => boolean
  maximum: (tree: T) => N | undefined
  minimum: (tree: T) => N | undefined
  succesor: (tree: T, node: N) => N | undefined
  predecessor: (tree: T, node: N) => N | undefined
  findNode: (tree: T, id: number) => N | undefined
}) : ReactElement {
  const [nodeValue, setValue] = useState<number>(0)
  const [id, setId] = useState<number>(0)
  const [render_id, rerender] = useState<number>(1)


  return (
    <Box sx={{display: "flex", flexDirection: "row"}}>
      <Box width="15vw">
        <Box sx={{margin: "50px", display: "flex", flexDirection: "column"}}>
          <>Node id: <TextField onChange={(event) => setId(Number(event.target.value))} value={id}></TextField></>
          <>Node Value: <TextField onChange={(event) => setValue(Number(event.target.value))} value={nodeValue}></TextField></>
        </Box>

        <Box sx={{margin: "50px", display: "flex", flexDirection: "column"}}>
          <Button onClick={() => {
            console.log(props.search(props.tree, nodeValue))
            rerender(render_id + 1)
          }}>
            search
          </Button>
          <Button onClick={() => {
            console.log(props.insert(props.tree, nodeValue))
            rerender(render_id + 1)
          }}>
            insert
          </Button>
          <Button onClick={() => {
            const n = props.findNode(props.tree, id); if(n !== undefined) console.log(props.delete(props.tree, n)); else console.log("node not in tree")
              rerender(render_id + 1)
          }}>
            delete
          </Button>
          <Button onClick={() => {
            console.log(props.maximum(props.tree))
            rerender(render_id + 1)
          }}>
            maximum
          </Button>
          <Button onClick={() => {
            console.log(props.minimum(props.tree))
            rerender(render_id + 1)
          }}>
            minimum
          </Button>
          <Button onClick={() => {
            const n = props.findNode(props.tree, id); if(n !== undefined) console.log(props.succesor(props.tree, n)); else console.log("node not in tree")
              rerender(render_id + 1)
          }}>
            succesor
          </Button>
          <Button onClick={() => {
            const n = props.findNode(props.tree, id); if(n !== undefined) console.log(props.predecessor(props.tree, n)); else console.log("node not in tree")
              rerender(render_id + 1)
          }}>
            predecessor
          </Button>
        </Box>
      </Box>

      <Box>
          {props.renderTree(props.tree)}
      </Box>
    </Box>
  )
}