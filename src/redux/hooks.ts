/** Typed versions of react-redux's hooks, for function components. */
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from './configureStore'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
