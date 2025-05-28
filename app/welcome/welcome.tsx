import logoDark from './logo-dark.svg';
import logoLight from './logo-light.svg';

export function Welcome() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-[500px] max-w-[100vw] p-4 mb-8">
            <img src={logoLight} alt="Audityzer" className="block w-full dark:hidden" />
            <img src={logoDark} alt="Audityzer" className="hidden w-full dark:block" />
          </div>

          <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-6">
            Audityzer Security Testing Kit
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl mb-12">
            A powerful toolkit for testing Web3 dApps and finding security vulnerabilities before
            they go to production
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 w-full max-w-4xl">
            <FeatureCard
              title="Wallet Integrations"
              description="Test interactions with MetaMask, Coinbase, Phantom and other wallets without manual clicking."
              icon={<WalletIcon />}
            />
            <FeatureCard
              title="Transaction Fuzzing"
              description="Discover edge cases by automatically testing transaction parameters and inputs."
              icon={<SecurityIcon />}
            />
            <FeatureCard
              title="Mock dApp Runs"
              description="Test against local environments without deploying to live test networks."
              icon={<TestingIcon />}
            />
            <FeatureCard
              title="Vulnerability Reports"
              description="Generate detailed reports with severity scoring and remediation steps."
              icon={<ReportIcon />}
            />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get Started</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 w-full max-w-xl">
              <pre className="text-sm overflow-x-auto p-4 bg-gray-100 dark:bg-gray-900 rounded-lg mb-4">
                <code>npm install Audityzer</code>
              </pre>
              <pre className="text-sm overflow-x-auto p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <code>npx Audityzer generate --wallet metamask</code>
              </pre>
            </div>
          </div>

          <div className="flex mt-8 space-x-4">
            <a
              href="https://github.com/yourusername/Audityzer"
              className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg font-medium"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon className="mr-2" />
              View on GitHub
            </a>
            <a
              href="/docs"
              className="flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-gray-900 dark:text-white rounded-lg font-medium"
            >
              <DocsIcon className="mr-2" />
              Documentation
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="mb-4 text-blue-600 dark:text-blue-400">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-center text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

// Icons
function WalletIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path>
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path>
      <path d="M18 12a2 2 0 0 0 0 4h2v-4h-2Z"></path>
    </svg>
  );
}

function SecurityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
      <path d="m8 11 3 3 5-5"></path>
    </svg>
  );
}

function TestingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 16V9h14V2H5l14 14h-7m-7 0v7"></path>
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <path d="M14 2v6h6"></path>
      <path d="M16 13H8"></path>
      <path d="M16 17H8"></path>
      <path d="M10 9H8"></path>
    </svg>
  );
}

function GithubIcon({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
      <path d="M9 18c-4.51 2-5-2-7-2"></path>
    </svg>
  );
}

function DocsIcon({ className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
      <path d="M8 7h6"></path>
      <path d="M8 11h8"></path>
    </svg>
  );
}
