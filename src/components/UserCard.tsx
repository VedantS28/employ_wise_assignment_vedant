
import React from 'react';
import { User } from '../services/api';
import { Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const navigate = useNavigate();
  
  const handleEdit = () => {
    navigate(`/users/edit/${user.id}`);
  };
  
  return (
    <div className="glass-card card-hover rounded-2xl overflow-hidden flex flex-col">
      <div className="relative">
        {/* Blurred background using the avatar as background */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-lg opacity-20" 
          style={{ backgroundImage: `url(${user.avatar})` }}
        />
        
        <div className="relative p-6 flex flex-col items-center">
          <img 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`} 
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            loading="lazy"
          />
          
          <h3 className="mt-4 text-xl font-semibold">
            {user.first_name} {user.last_name}
          </h3>
          
          <p className="text-sm text-muted-foreground mt-1">
            {user.email}
          </p>
        </div>
      </div>
      
      <div className="px-6 py-4 mt-auto flex justify-end border-t border-slate-100">
        <button
          onClick={handleEdit}
          className="p-2 rounded-lg text-slate-600 hover:text-primary hover:bg-accent transition-colors"
          aria-label={`Edit ${user.first_name} ${user.last_name}`}
        >
          <Edit size={18} />
        </button>
        
        <button
          onClick={() => onDelete(user.id)}
          className="p-2 rounded-lg text-slate-600 hover:text-destructive hover:bg-destructive/10 transition-colors ml-2"
          aria-label={`Delete ${user.first_name} ${user.last_name}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
