
import React, { useState } from 'react';
import { Leaf, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthProps {
  onLogin: (email: string, name: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && (isLogin || name)) {
      onLogin(email, name || 'User');
    }
  };

  return (
    <div className="min-h-[100dvh] bg-white dark:bg-zinc-950 flex flex-col p-8 safe-pt">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="mb-12">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-3xl flex items-center justify-center mb-6">
            <Leaf className="text-green-600" size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            AgroDetect <span className="text-green-600">AI</span>
          </h1>
          <p className="text-gray-500 dark:text-zinc-400 text-lg">
            {isLogin ? 'Welcome back! Your crops are waiting.' : 'Join our community of smart farmers.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <InputGroup 
              icon={<User size={20} />} 
              placeholder="Full Name" 
              value={name} 
              onChange={setName} 
            />
          )}
          <InputGroup 
            icon={<Mail size={20} />} 
            placeholder="Email Address" 
            type="email" 
            value={email} 
            onChange={setEmail} 
          />
          <InputGroup 
            icon={<Lock size={20} />} 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={setPassword} 
          />

          <button 
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-green-200 dark:shadow-none transition-all flex items-center justify-center gap-2 group mt-4 active:scale-95"
          >
            {isLogin ? 'Login' : 'Create Account'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-500 dark:text-zinc-500 text-sm"
          >
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span className="text-green-600 font-bold">{isLogin ? 'Sign Up' : 'Log In'}</span>
          </button>
        </div>
      </div>
      
      <div className="text-center text-[10px] text-gray-400 safe-pb opacity-50">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </div>
    </div>
  );
};

const InputGroup = ({ icon, placeholder, type = 'text', value, onChange }: any) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 dark:bg-zinc-900 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-green-600 dark:text-white transition-all outline-none"
      required
    />
  </div>
);

export default Auth;
