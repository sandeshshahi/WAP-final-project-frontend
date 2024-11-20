interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'small' | 'medium' | 'large'; // Optional size prop
}

const Avatar = ({ name, imageUrl, size = 'medium' }: AvatarProps) => {
  // Function to extract initials
  const getInitials = (name: string) => {
    const nameParts = name.trim().split(' ');
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
    return (
      nameParts[0].charAt(0).toUpperCase() +
      nameParts[nameParts.length - 1].charAt(0).toUpperCase()
    );
  };

  // Determine size classes based on size prop
  const sizeClasses = {
    small: 'w-8 h-8 text-sm',
    medium: 'w-12 h-12 text-lg',
    large: 'w-16 h-16 text-xl',
  };

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-indigo-500 border-2 border-gray-100 overflow-hidden ${
        sizeClasses[size]
      }`}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-white font-bold">{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
