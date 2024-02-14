import { useDispatch, useSelector, useStore } from 'react-redux'

// Se usa en toda la aplicación en lugar de simplemente usar 'useDispatch' y 'useSelector'
export const useAppDispatch = useDispatch
export const useAppSelector = useSelector
export const useAppStore = useStore