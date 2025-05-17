import { Title } from '@solidjs/meta';
import { createSignal } from 'solid-js';

export default function Home() {
  const [count, setCount] = createSignal(0);

  return (
    <main class="container mx-auto p-4">
      <Title>Audityzer - SolidStart App</Title>
      <h1 class="text-3xl font-bold mb-6">Audityzer SolidStart Integration</h1>

      <div class="bg-gray-100 p-6 rounded-lg shadow-md">
        <p class="mb-4">
          This is a SolidStart application integrated with Codecov for bundle analysis.
        </p>

        <div class="flex items-center justify-center p-4 bg-white rounded-md shadow">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setCount(count() + 1)}
          >
            Count: {count()}
          </button>
        </div>
      </div>
    </main>
  );
}
