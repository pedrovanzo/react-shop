import LoadingSpinner from "../../components/loading/spinner";
import { useFirebaseAuth } from "../../contexts/auth";
export default function Home() {

  const { userIsLoading } = useFirebaseAuth();

  if (userIsLoading)
    return (
      <div className="absolute inset-0 bg-contrast/50 min-h-50 flex justify-center">
        <LoadingSpinner text="loading user..." />
      </div>
    );

  return (
    <>
      <div className="text-default">login and presentation</div>
    </>
  );
}
