
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById, updateUser, User } from '../services/api';
import { toast } from 'sonner';
import LoadingSpinner from '../components/LoadingSpinner';
import { ArrowLeft, Save, AlertTriangle } from 'lucide-react';

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await getUserById(parseInt(id));
        const userData = response.data.data as User;
        
        setUser(userData);
        setFormData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user details');
        toast.error('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const validateForm = () => {
    const errors = {
      first_name: '',
      last_name: '',
      email: ''
    };
    
    let isValid = true;
    
    if (!formData.first_name.trim()) {
      errors.first_name = 'First name is required';
      isValid = false;
    }
    
    if (!formData.last_name.trim()) {
      errors.last_name = 'Last name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !id) return;
    
    try {
      setSaving(true);
      await updateUser(parseInt(id), formData);
      
      toast.success('User updated successfully');
      navigate('/users');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="page-container flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle size={36} className="text-destructive mb-4" />
        <h3 className="text-xl font-medium">Something went wrong</h3>
        <p className="text-muted-foreground mt-2 mb-4">{error || 'User not found'}</p>
        <button
          onClick={() => navigate('/users')}
          className="btn-primary"
        >
          Go Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="page-container max-w-3xl mx-auto">
      <div className="flex items-center mb-8 animate-slide-down">
        <button
          onClick={() => navigate('/users')}
          className="p-2 rounded-lg hover:bg-secondary transition-colors mr-3"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Edit User</h1>
      </div>
      
      <div className="glass-card rounded-2xl p-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          
          <div>
            <h2 className="text-xl font-semibold text-center sm:text-left">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-muted-foreground text-center sm:text-left">
              {user.email}
            </p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="first_name" className="text-sm font-medium">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              className={`form-input ${
                formErrors.first_name ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''
              }`}
            />
            {formErrors.first_name && (
              <p className="text-destructive text-sm mt-1">{formErrors.first_name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="last_name" className="text-sm font-medium">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              className={`form-input ${
                formErrors.last_name ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''
              }`}
            />
            {formErrors.last_name && (
              <p className="text-destructive text-sm mt-1">{formErrors.last_name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${
                formErrors.email ? 'border-destructive focus:border-destructive focus:ring-destructive' : ''
              }`}
            />
            {formErrors.email && (
              <p className="text-destructive text-sm mt-1">{formErrors.email}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="btn-secondary"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
            >
              {saving ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
