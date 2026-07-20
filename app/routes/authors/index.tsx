import type { Route } from '../+types/index';
import Authors from '~/components/Authors';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Scientist's Assistant | Authors" },
    { name: 'description', content: 'find scholarly works and authors' },
  ];
}

export default function HomePage() {
  return (
    <div className=" flex-1 min-w-0 space-y-5 p-5 md:mx-0 md:w-auto">
      <Authors />
    </div>
  );
}
