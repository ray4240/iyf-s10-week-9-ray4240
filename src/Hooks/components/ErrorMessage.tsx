type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="bg-red-950 border border-red-800 rounded-2xl p-8 text-center max-w-md mx-auto mt-10">
      <p className="text-red-400 text-lg mb-4">⚠️ {message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl text-sm font-medium"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
export {};