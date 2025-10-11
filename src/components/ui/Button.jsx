// website/src/components/ui/Button.jsx
import Link from 'next/link';

export default function Button({ 
  children, 
  variant = 'primary', 
  href, 
  className = '',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium py-3 px-6 rounded-lg transition-colors duration-200';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}