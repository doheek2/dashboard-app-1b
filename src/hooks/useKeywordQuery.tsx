import { useQuery } from 'react-query'
import { getDissNameCodeList } from 'services/apis'
import { incrementCallCount } from 'states/search'
import { useAppDispatch } from './useAppDispatch'

const useKeywordQuery = (keyword: string) => {
  const dispatch = useAppDispatch()

  return useQuery(['recommendKeyword', keyword], () => getDissNameCodeList(keyword), {
    enabled: !!keyword,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    suspense: true,
    onSuccess: () => dispatch(incrementCallCount(keyword)),
  })
}

export default useKeywordQuery
