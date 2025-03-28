import { Link } from 'react-router-dom';
import csLogo from '../assets/img/CS_Logo_small.png';

const Logo = ({ size = 'md', withText = true, className = '' }) => {
  const sizes = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-20 w-auto'
  };

  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <img 
        src={csLogo} 
        alt="Corinna Spitzer Logo" 
        className={`${sizes[size]} object-contain transition-all duration-300 transform group-hover:scale-105`}
      />
      
      {withText && (
        <div className="hidden sm:block">
          <h1 className="text-xl font-display font-bold text-whippet-600 transition-all duration-300 group-hover:translate-x-0.5">
            Corinna Spitzer
          </h1>
          <div className="text-xs text-gray-600 tracking-wide">Dog Physio • Breeding • Flyball</div>
        </div>
      )}
    </Link>
  );
};

export default Logo; 