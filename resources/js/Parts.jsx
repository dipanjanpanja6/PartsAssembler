import { Add, Edit, ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  ListItemButton,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import PartsCanvas from './3D/Products/Canvas.jsx'
import { getProps } from './utils.ts'

export default function Parts() {
  const props = getProps()

  const [selectedParts, setSelectedParts] = useState([])
  const [state, setState] = useState({ part: null })

  const handleSelect = (e) => {
    const part = props.parts?.find((part) => part.id == e.target.value)

    setState({ ...state, part })
  }
  const handleEdit = () => {}
  const handleAdd = (part) => () => {
    setSelectedParts([...selectedParts, part])
  }
  const handleAddProduct = (product) => async () => {
    const data = await (await fetch(`/products/${product.id}`)).json()
    setSelectedParts([...selectedParts, ...data.parts])
  }
  const suggestedProducts = selectedParts?.reduce((acc, part) => {
    const product = part.product
    if (product) acc.set(product.id, product)
    return acc
  }, new Map())

  return (
    <Grid container>
      <Grid item md={6}>
        <Box height={'100vh'} overflow="auto">
          <AppBar position="sticky" variant="outlined">
            <Toolbar>
              <Typography variant="h6" fontWeight="bold">
                Parts assembler
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
              {/* <Typography variant="h5" component="h1">
              Select parts
            </Typography> */}
              <Stack direction="row" spacing={2} alignItems="center" sx={{ my: 2 }}>
                <TextField fullWidth label="Select parts" size="small" select onChange={handleSelect} value={state.part?.id || ''}>
                  <MenuItem disabled>Select</MenuItem>
                  {props.parts?.map((part) => (
                    <MenuItem key={part.id} value={part.id}>
                      {part.name}
                    </MenuItem>
                  ))}
                </TextField>
                <IconButton aria-label="" onClick={handleAdd(state.part)}>
                  <Add />
                </IconButton>
                <IconButton aria-label="" onClick={handleEdit}>
                  <Edit />
                </IconButton>
              </Stack>

              {suggestedProducts.size > 0 && (
                <>
                  <Typography variant="h5" component="h1" gutterBottom>
                    Suggested products
                  </Typography>
                  {[...suggestedProducts.values()].map((product) => (
                    <Chip key={product.id} label={product.name} onClick={handleAddProduct(product)} />
                  ))}
                </>
              )}

              <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
                Selected parts
              </Typography>
              {selectedParts?.map((selectedPart) => (
                <SelectedParts key={selectedPart.id} {...selectedPart} selectedParts={selectedParts} handleAdd={handleAdd} />
              ))}
            </Box>
          </Container>
          <Stack mb={2} mr={7} alignItems="flex-end">
            <Button variant="contained" size="large">
              Submit
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Grid item md={6}>
        <Box height={'100vh'} borderLeft={1} sx={{ background: 'linear-gradient(180deg, #e6eaf5 0%, #f6f6f6 80%)' }} position="relative" id="three-container">
          {/* <CanvasComponent /> */}
          {/* <Connectors /> */}
          {/* <Kitchen /> */}
          {/* <Christmas /> */}
          <PartsCanvas selectedParts={selectedParts} />
        </Box>
      </Grid>
    </Grid>
  )
}

import React from 'react'

function SelectedParts({ handleAdd, selectedParts, ...selectedPart }) {
  const [relatedParts, setRelatedParts] = useState()

  useEffect(() => {
    const getRelatedParts = async (id) => {
      const data = await (await fetch(`/parts/${id}/related`)).json()
      setRelatedParts(data)
    }
    getRelatedParts(selectedPart.id)
  }, [])

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>{selectedPart.name}</AccordionSummary>
      <Divider variant="middle" />
      <AccordionDetails>
        <Typography gutterBottom color="text.secondary">
          Related parts:
        </Typography>
        {relatedParts?.length
          ? relatedParts.map((relatedPart, i) => {
              const existPart = selectedParts.some((part) => part.id === relatedPart.id)
              return (
                <Fragment key={relatedPart.id}>
                  <ListItemButton dense onClick={handleAdd(relatedPart)} disabled={existPart}>
                    <ListItemText primary={relatedPart.name} secondary={relatedPart.quantity} />
                  </ListItemButton>

                  {i + 1 < relatedParts?.length && <Divider />}
                </Fragment>
              )
            })
          : 'This parts not have any related items'}
      </AccordionDetails>
    </Accordion>
  )
}
