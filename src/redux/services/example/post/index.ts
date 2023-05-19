import { exampleApi } from '@/redux/services/example/exampleApi'
import { Post } from '@/redux/services/example/post/types'

type PostResponse = Post[]

const postApi = exampleApi.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<PostResponse, void>({
      query: () => ({
        url: '/posts',
        method: 'GET',
      }),
      providesTags: (result) => {
        return result?.length
          ? [
              ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }]
      },
    }),
    getPostById: build.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => [{ type: 'Posts', id: result?.id }],
    }),
    createPost: build.mutation<
      Post,
      Partial<Post> & Pick<Post, 'title' | 'body'>
    >({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        data: post,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: 'LIST' }],
    }),
    updatePostById: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}`,
        method: 'PATCH',
        data: patch,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getPostById', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      // transformErrorResponse: (
      //   response: { status: string | number },
      //   meta,
      //   arg
      // ) => response.status,
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg.id }],
    }),
    deletePostById: build.mutation({
      query: (id: number) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Posts', id: arg }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useDeletePostByIdMutation,
  useUpdatePostByIdMutation,
  useCreatePostMutation,
} = postApi
