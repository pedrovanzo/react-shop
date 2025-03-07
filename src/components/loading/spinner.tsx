export default function LoadingSpinner() {
  return (
    <div className="w-fit flex flex-col items-center justify-center">
      <div className="relative size-10 bg-transparent rounded-full flex justify-center items-center animate-spin">
        <div className="absolute top-0 leading-none m-auto w-2 h-1 bg-default"></div>
      </div>
      <div className="text-default text-sm">loading...</div>
    </div>
  );
}
