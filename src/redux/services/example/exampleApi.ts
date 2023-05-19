import { axiosBaseQuery } from '@/redux/services/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const exampleApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_EXAMPLE_API_URL || '', // /api/mock
  }),
  tagTypes: ['Posts'],
  endpoints: () => ({}),
})
