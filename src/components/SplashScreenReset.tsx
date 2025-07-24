import { Button } from "@/components/ui/button";

/**
 * A utility component for resetting the splash screen for testing purposes
 * Only used during development
 */
const SplashScreenReset = () => {
  // Function to reset the splash screen
  const resetSplashScreen = () => {
    localStorage.removeItem('hasVisitedBefore');
    window.location.reload();
  };

  // Only render in development mode
  if (import.meta.env.DEV) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetSplashScreen}
          className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-md hover:bg-gray-100"
        >
          Reset Splash
        </Button>
      </div>
    );
  }

  // Return null in production
  return null;
};

export default SplashScreenReset; 