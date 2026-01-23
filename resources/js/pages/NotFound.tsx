import { Link } from "react-router-dom";
import { Coffee, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="text-center animate-fade-in">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
          <Coffee className="h-10 w-10 text-muted-foreground" />
        </div>
        
        <h1 className="mb-2 text-6xl font-bold text-foreground">404</h1>
        <p className="mb-1 text-xl font-medium text-foreground">Page introuvable</p>
        <p className="mb-8 text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        
        <Button asChild>
          <Link to="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
