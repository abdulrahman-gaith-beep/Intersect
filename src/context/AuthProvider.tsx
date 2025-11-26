import { useState, type ReactNode } from 'react';
import { AuthContext, type User } from './AuthContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('intersect_user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call (_password would be validated server-side in real app)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name: 'John Smith',
      email,
      company: 'TechCorp International'
    };
    
    setUser(mockUser);
    localStorage.setItem('intersect_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = async (name: string, email: string, _password: string, company: string): Promise<boolean> => {
    // Simulate API call (_password would be validated server-side in real app)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      name,
      email,
      company
    };
    
    setUser(mockUser);
    localStorage.setItem('intersect_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('intersect_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
