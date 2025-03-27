
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="glass-card rounded-2xl p-8 w-full max-w-md animate-slide-up">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
        <p className="text-muted-foreground mt-2 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="btn-primary inline-flex items-center"
        >
          <ArrowLeft size={18} className="mr-2" />
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
