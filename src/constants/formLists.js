import { v4 as uuidv4 } from 'uuid'

export const defaultParamsList = [
  { id: uuidv4(), name: 'product_name', label: 'product_name' },
  { id: uuidv4(), name: 'model', label: 'model' },
  { id: uuidv4(), name: 'regular_price', label: 'regular_price' },
  { id: uuidv4(), name: 'net_cost', label: 'net_cost' },
  { id: uuidv4(), name: 'left_in_warehouse', label: 'left_in_warehouse' }
]

export const inputData = [
  { name: 'product_name', label: 'product_name', id: uuidv4() },
  { name: 'description', label: 'description', id: uuidv4(), isTextArea: true },
  { name: 'model', label: 'model', id: uuidv4() },
  { name: 'collection', label: 'collection', id: uuidv4() },
  { name: 'category', label: 'category', id: uuidv4(), isFormSelect: true, category: true },
  { name: 'regular_price', label: 'regular_price', id: uuidv4() },
  { name: 'priority_price', label: 'priority_price', id: uuidv4() },
  { name: 'net_cost', label: 'net_cost', id: uuidv4() },
  { name: 'left_in_warehouse', label: 'left_in_warehouse', id: uuidv4() },
  { name: 'is_included', label: 'is_included', id: uuidv4(), isFormSelect: true, status: true },
  { name: 'semi_ready_id', label: 'type', id: uuidv4(), isFormSelect: true, semi_ready: true },
  { name: 'color', label: 'color', id: uuidv4() },
  { name: 'production_id', label: 'production_id', id: uuidv4(), isFormSelect: true, production: true },
]

export const filteredWareHouseForm = [
  { name: 'model' },
  { name: 'collection' },
  { name: 'category' },
]

export const filteredWareHouseFormMaterial = [
  { name: 'model' },
  { name: 'category' },
]

export const filterOrdersForm = [
  {name: 'orderNumber'},
  {name: 'status'},
  {name: 'buyer'},
  {name: 'orderPrice'},
  {name: 'creatingDate'},
]

export const ordersHeaderTable = ['orderNumber', 'buyer', 'status', 'orderPrice', 'created', 'doBefore']
