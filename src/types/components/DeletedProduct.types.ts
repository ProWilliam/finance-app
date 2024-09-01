export default interface deletePRoduct { 
  visible: boolean, 
  onConfirm: () => void, 
  onCancel: () => void, 
  info: string, 
  id: string,
}