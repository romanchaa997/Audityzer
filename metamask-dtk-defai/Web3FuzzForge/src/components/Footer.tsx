import { File, Code2 } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="border-t border-gray-700/30 py-6 mt-auto">
      <div className="max-w-4xl mx-auto px-6 flex justify-center space-x-8">
        <a
          href="https://docs.gator.metamask.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <File className="h-4 w-4" />
          <span>Docs</span>
        </a>
        <a
          href="https://github.com/metamask/gator-examples"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <Code2 className="h-4 w-4" />
          <span>Examples</span>
        </a>
      </div>
    </footer>
  );
}
