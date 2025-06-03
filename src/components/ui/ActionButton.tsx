import { Plus } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  label: string;
}

const ActionButton = ({ onClick, label }: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center transition-colors duration-200"
    >
      <Plus size={16} className="mr-1" />
      {label}
    </button>
  );
};

export default ActionButton;