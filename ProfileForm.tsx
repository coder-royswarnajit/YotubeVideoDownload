import React, { useState } from 'react';

// Components
import Button from '../../common/Button';
import Input from '../../common/Input';

interface ProfileFormProps {
  initialData: {
    name: string;
    email: string;
    bio: string;
    location: string;
  };
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Input
            label="Full Name"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Email Address"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            fullWidth
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleInputChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <Button
          variant="outline"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;