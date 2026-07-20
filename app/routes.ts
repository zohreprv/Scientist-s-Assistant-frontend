import {
  type RouteConfig,
  route,
  layout,
  index,
} from '@react-router/dev/routes';

export default [
  index('routes/redirect/index.tsx'),
  layout('routes/layouts/works-layout.tsx', [
    route('/works', 'routes/works/index.tsx'),
  ]),
  layout('routes/layouts/authors-layout.tsx', [
    route('/authors', 'routes/authors/index.tsx'),
  ]),
  route('authors/:authorId', 'routes/authors/details.tsx'),
  route('*', 'routes/notFound/index.tsx'),
] satisfies RouteConfig;
